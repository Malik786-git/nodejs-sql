const { Users } = require("../models");
const express = require("express");

const router = express.Router();


router.post("/signup", async (req, res) => {
  try {
    const createUser = await Users.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({ message: "User Has Been Created", createUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.patch("/update-user/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const updateUser = await Users.update(
      {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      },
      {
        where: {
          id: userID,
        },
      }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/get_users", async (req, res) => {
    try {
        const findusers = await Users.findAll();
        res.status(200).json({message:"Your Data", findusers});

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal Server Error!"})
    }
});

router.delete("/delete_user/:userID", async (req , res) => {
    try {
        const userId = req.params.userID;
        const findUser  = Users.findOne({userId});
        if (!findUser) {
            res.status(400).json({message:"User Not Found"})
        } else {
            const deleteUser = await Users.destroy(
                {
                  where: {
                    id: userId,
                  },
                }
              );
              res.status(200).json({message:"User has been deleted!", deleteUser})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server Error!"})
    }
})

module.exports = router;