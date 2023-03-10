  // Server-side endpoint for updating a user's name
  app.put('users/:id', (req, res) => {
    const { id } = req.params;
    const { username } = req.body;
    
    try {
        // Update user name in database
        const updatedUser = updateUser(id, { username });
  
        // Return updated user object in response
        res.json(updatedUser);

      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to update User" });
      }
  });
