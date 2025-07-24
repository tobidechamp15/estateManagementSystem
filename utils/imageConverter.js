// utils/imageConverter.js
import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";

export async function convertImageToBase64(imageInput) {
  try {
    // Case 1: No image provided - use default
    if (!imageInput) {
      return convertDefaultImage();
    }

    // Case 2: Already Base64 string
    if (typeof imageInput === "string" && imageInput.startsWith("data:")) {
      if (!isValidBase64Image(imageInput)) {
        throw new Error("Invalid Base64 image format");
      }
      return imageInput;
    }

    // Case 3: URL to image
    if (typeof imageInput === "string" && /^https?:\/\//i.test(imageInput)) {
      return await convertImageUrlToBase64(imageInput);
    }

    // Case 4: File path (server-side)
    if (
      typeof imageInput === "string" &&
      /\.(jpg|jpeg|png|gif|svg)$/i.test(imageInput)
    ) {
      return await convertLocalImageToBase64(imageInput);
    }

    // Case 5: File object (from FormData)
    if (
      typeof imageInput === "object" &&
      imageInput.type?.startsWith("image/")
    ) {
      return await convertFileObjectToBase64(imageInput);
    }

    // If none match, use default
    return convertDefaultImage();
  } catch (error) {
    console.error("Image conversion error:", error);
    return convertDefaultImage(); // Fallback to default
  }
}

// Helper functions
async function convertDefaultImage() {
  const defaultImagePath = path.join(
    process.cwd(),
    "public",
    "assets",
    "defaultUser.svg"
  );
  const imageData = await fs.readFile(defaultImagePath);
  return `data:image/svg+xml;base64,${imageData.toString("base64")}`;
}

async function convertImageUrlToBase64(url) {
  const response = await fetch(url);
  if (!response.ok)
    throw new Error(`Failed to fetch image: ${response.statusText}`);

  const buffer = await response.arrayBuffer();
  const contentType = response.headers.get("content-type");
  return `data:${contentType};base64,${Buffer.from(buffer).toString("base64")}`;
}

async function convertLocalImageToBase64(filePath) {
  const imageData = await fs.readFile(filePath);
  const ext = path.extname(filePath).slice(1);
  return `data:image/${ext};base64,${imageData.toString("base64")}`;
}

async function convertFileObjectToBase64(file) {
  const buffer = Buffer.from(await file.arrayBuffer());
  return `data:${file.type};base64,${buffer.toString("base64")}`;
}

function isValidBase64Image(base64String) {
  return /^data:image\/(png|jpeg|jpg|gif|svg\+xml);base64,[a-zA-Z0-9+/]+={0,2}$/.test(
    base64String
  );
}
