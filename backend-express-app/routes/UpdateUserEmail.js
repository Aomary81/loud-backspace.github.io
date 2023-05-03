// Server-side endpoint for updating a user's email address
app.put('/users/:id/email', (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    try {
    // Update user email in database or user store
    const updatedUser = updateUser(id, { email });

    // Return updated user object in response
    res.json(updatedUser);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update email" });

      }
  });
