const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

//Create a new contact
router.post("/contacts", async (req, res) => {
  try {
    const newContact = await Contact.create(req.body);
    res.status(200).json(newContact);
  } catch (error) {
    res.status(400).json({ error: "Failed to create contact." });
  }
});

//Get all contacts
router.get("/contacts", async (req, res) => {
  try {
    const contacts = await Contact.findAll();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contacts." });
  }
});

//Get one contact
router.get("/contacts/:id", async (req, res) => {
  const contactId = req.params.id;
  try {
    const contact = await Contact.findByPk(contactId);

    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ error: "Contact not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact." });
  }
});

router.put("/contacts/:id", async (req, res) => {
  const contactId = req.params.id;
  try {
    const [updatedCount, updatedContacts] = await Contact.update(req.body, {
      where: { id: contactId },
      returning: true,
    });

    if (updatedCount > 0) {
      res.status(200).json(updatedContacts[0]);
    } else {
      res.status(404).json({ error: "Contact not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update contact." });
  }
});

router.delete("/contacts/:id", async (req, res) => {
  const contactId = req.params.id;
  try {
    const updatedCount = await Contact.destroy({
      where: { id: contactId },
    });

    if (updatedCount > 0) {
      res.status(200).json("Contact deleted.");
    } else {
      res.status(404).json({ error: "Contact not found." });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete contact." });
  }
});

module.exports = router;
