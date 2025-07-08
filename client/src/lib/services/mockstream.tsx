export async function getMockStreamFromImage(imageSrc: string, width = 640, height = 480): Promise<MediaStream> {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        if (!ctx) return reject("Canvas context not available");

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = imageSrc;

        img.onload = () => {
            ctx.drawImage(img, 0, 0, width, height);
            const stream = canvas.captureStream(15); // 15 FPS
            resolve(stream);
        };

        img.onerror = () => reject("Failed to load image for mock stream");
    });
}
