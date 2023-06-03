import wasteDropOffPointSchema from "@/backend/models/wasteDropOffPointSchema";
import { dbConnect } from "@/db/db";

export default async function postWasteDropOffPoint(req, res) {
    if(req.method === "POST") {
        dbConnect();
        const { name, lat, lng } = req.body;
        const newWasteDropOffPoint = {
            name,
            lat,
            lng
        }
        try {
            const createdPoint = await wasteDropOffPointSchema.create(newWasteDropOffPoint);
            res.status(201).json({ success: true, data: createdPoint });
        }
        catch(error) {
            res.status(400).json({ success: false, error: error });
        }
    }
}