import { ContactUs } from "../../models/contactUs.model.js";

export const ContactService = {
  async create(payload) {
    try {
      return await ContactUs.create(payload);
    } catch (error) {
      throw new Error(error.message);
    }
  },

  async getAll() {
    return await ContactUs.findAll({
      order: [["created_at", "DESC"]],
    });
  },

  async getById(id) {
    return await ContactUs.findByPk(id);
  },
};


