import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadCloudnirary from "../utils/cloudnary.js";

export const addItem = async (req, res) => {
  try {
    const { name, category, foodtype, foodType, price } = req.body;

    if (!name || !category || !price || !(foodType || foodtype)) {
      return res
        .status(400)
        .json({ message: "Please fill all required fields" });
    }

    let image;
    if (req.file) {
      image = await uploadCloudnirary(req.file.path);
    }
    if (!image) {
      return res.status(400).json({ message: "Food image is required" });
    }

    const normalizedFoodType = (foodType || foodtype || "")
      .toLowerCase()
      .replace(" ", "-");

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res
        .status(404)
        .json({ message: "Shop not found. Please create your shop first." });
    }
    const item = await Item.create({
      name,
      category,
      foodType: normalizedFoodType,
      price,
      image,
      shop: shop._id,
    });

    shop.item.push(item._id);
    await shop.save();
    await shop.populate("item owner");

    return res.status(201).json(item);
  } catch (error) {
    return res.status(500).json({ message: `add item error ${error.message}` });
  }
};
export const editItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const { name, category, foodtype, foodType, price } = req.body;
    let image;
    if (req.file) {
      image = await uploadCloudnirary(req.file.path);
    }

    const updates = {
      name,
      category,
      foodType: (foodType || foodtype || "").toLowerCase().replace(" ", "-"),
      price,
    };
    if (image) updates.image = image;

    const item = await Item.findByIdAndUpdate(itemId, updates, { new: true });
    if (!item) {
      return res.status(400).json({ message: "ITEM NOT FOUND" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `edit item error ${error.message}` });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    const shop = await Shop.findOne({ owner: req.userId });
    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    const item = await Item.findOne({ _id: itemId, shop: shop._id });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    await Item.findByIdAndDelete(itemId);
    shop.item = shop.item.filter((id) => id.toString() !== itemId);
    await shop.save();

    return res
      .status(200)
      .json({ message: "Item deleted successfully", itemId });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `delete item error ${error.message}` });
  }
};

export const getItemById = async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item)
  } catch (error) {
   return res.status(500).json({massage:`get item error`}) 
  }
};
