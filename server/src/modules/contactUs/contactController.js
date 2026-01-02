import { ContactService } from "./contactService.js";

export const ContactController = {
  async createContact(req, res) {
    try {
      const { name, email, subject, message } = req.body;

      const contact = await ContactService.create({
        name,
        email,
        subject,
        message,
      });

      return res.status(201).json({
        success: true,
        message: "Message sent successfully",
        data: contact,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to send message",
      });
    }
  },

  async getAllContacts(req, res) {
    try {
      const contacts = await ContactService.getAll();

      return res.json({
        success: true,
        data: contacts,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contacts",
      });
    }
  },

  async getContactById(req, res) {
    try {
      const { id } = req.params;

      const contact = await ContactService.getById(id);

      if (!contact) {
        return res.status(404).json({
          success: false,
          message: "Contact not found",
        });
      }

      return res.json({
        success: true,
        data: contact,
        
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Failed to fetch contact",
      });
    }
  },
};
