
import Shop from "../models/shop.model.js";
import uploadCloudinary from "../utils/cloudnary.js";

export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;


    if (req.file) {
      image = await uploadCloudinary(req.file.path);
    }


    let shop = await Shop.findOne({ owner: req.userId });

    if (!shop) {
      // Create new shop
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId,
      });
    } else {

      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name, city, state, address,
          image: image || shop.image,
        },
        { new: true }
      );
    }

    await shop.populate("owner");
    return res.status(201).json({
      success:true,
      shop,
    });
  } catch (error) {
    return res.status(500).json({ message: `Create shop error: ${error}` });
  }
};

export const getmyshop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner item");

    if (!shop) {
      return res.status(404).json({ message: "Shop not found" });
    }

    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Get my shop error: ${error}` });
  }
};
