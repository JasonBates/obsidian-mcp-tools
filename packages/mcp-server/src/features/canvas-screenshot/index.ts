import { makeRequest, type ToolRegistry } from "$/shared";
import { type } from "arktype";
import { LocalRestAPI } from "shared";

export function registerCanvasScreenshotTools(tools: ToolRegistry) {
  tools.register(
    type({
      name: '"screenshot_canvas"',
      arguments: {
        filename: type("string").describe(
          "Path to the .canvas file in the vault (e.g., 'folder/mycanvas.canvas')",
        ),
      },
    }).describe(
      "Capture a screenshot of an Obsidian canvas file. Returns the image as base64 PNG. The canvas will be automatically opened if not already visible, and zoomed to fit all content.",
    ),
    async ({ arguments: args }) => {
      const response = await makeRequest(
        LocalRestAPI.ApiCanvasScreenshotResponse,
        "/canvas/screenshot",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: args.filename }),
        },
      );

      return {
        content: [
          {
            type: "image",
            data: response.image,
            mimeType: response.mimeType,
          },
        ],
      };
    },
  );
}
