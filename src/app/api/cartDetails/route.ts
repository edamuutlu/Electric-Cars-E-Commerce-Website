import { car_ids } from "./carIds";
import fs from "fs";

export const GET = async () => {
  try {
    // JSON dosyasını oku
    const jsonData = fs.readFileSync("data.json", "utf8");
    const carIds = JSON.parse(jsonData);

    return new Response(JSON.stringify(carIds), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    // data.json dosyasını oku
    const jsonData = fs.readFileSync("data.json", "utf8");
    const carIds = JSON.parse(jsonData);

    // Gelen istekten veriyi al
    const items = await req.json();

    // Yeni öğe için bir id belirle
    const newId = carIds.length > 0 ? carIds[carIds.length - 1].id + 1 : 1;

    // Yeni öğeyi oluştur
    const newItem = {
      id: newId,
      price_id: items.price_id,
    };

    // Yeni öğeyi car_ids dizisine ekle
    carIds.push(newItem);

    // car_ids dizisini JSON dosyasına yaz
    const updatedJsonData = JSON.stringify(carIds, null, 2);
    fs.writeFileSync("data.json", updatedJsonData);

    // Yeni öğeyi yanıt olarak döndür
    return new Response(JSON.stringify(newItem), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {
  try {
    // Önce JSON dosyasını oku
    const jsonData = fs.readFileSync("data.json", "utf8");
    let carIds = JSON.parse(jsonData);

    // Silinecek öğenin price_id'sini al
    const { price_id } = await req.json();

    // Belirtilen price_id'ye sahip öğeyi bul ve kaldır
    const indexToRemove = carIds.findIndex(
      (item) => item.price_id === price_id
    );
    if (indexToRemove === -1) {
      return new Response(JSON.stringify({ error: "Item not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
    carIds.splice(indexToRemove, 1);

    // Filtrelenmiş veriyi JSON dosyasına yaz
    fs.writeFileSync("data.json", JSON.stringify(carIds));

    return new Response(
      JSON.stringify({ message: "Data deleted successfully" }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500,
    });
  }
};
