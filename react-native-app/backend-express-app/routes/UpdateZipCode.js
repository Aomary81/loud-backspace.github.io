const user = require("./models/user");

const UpdateZipCode = () => {
  app.put("/users/:email", async (req, res) => {
    const { email } = req.params;
    const { zipCode } = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate({ email }, { zipCode });

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update User" });
    }
  });
};
