import Transaction from "../model/Transaction.js";

export const addTransaction = async (req, res) => {
  try {

    const {
      title,
      amount,
      type,
      category,
      date,
    } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const transaction = await Transaction.create({
      title,
      amount,
      type,
      category,
      date,

      user: req.user._id,
    });

    res.status(201).json(transaction);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(transactions);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

export const deleteTransaction = async (req, res) => {
  try {

    const transaction = await Transaction.findById(
      req.params.id
    );

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found",
      });
    }

    if (
      transaction.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: "Transaction deleted",
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};