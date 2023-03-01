const user = require("./models/user");

const UpdateTags = () => {
  app.put("/users/:email", async (req, res) => {
    const { email } = req.params;
    const { tags } = req.body;

    try {
      const updatedUser = await User.findOneAndUpdate({ email }, { tags });

      res.json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update User" });
    }
  });
};
