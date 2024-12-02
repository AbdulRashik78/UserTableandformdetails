import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from "@mui/material";
import { UploadFile as UploadFileIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const ImageUpload = ({ uploadedImage, setUploadedImage }) => {
  const [preview, setPreview] = useState(null); // To store the image preview

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    } else {
      alert("Please upload a valid image file.");
    }
  };

  // Handle image discard
  const handleDiscard = () => {
    setUploadedImage(null);
    setPreview(null); // Remove preview
  };

  return (
    <Box
      sx={{
        padding: 2,
        border: "1px solid lightgray",
        borderRadius: 2,
        width: "80%",
        maxWidth: 250,
        margin: "auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography variant="h6" textAlign="center" gutterBottom>
        Upload Image
      </Typography>
      <Stack spacing={1} alignItems="center">
        {/* Image Input */}
        {!uploadedImage ? (
          <>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Choose Image
              <input
                type="file"
                accept="image/*" // Accept only image files
                hidden
                onChange={handleImageUpload}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              (Supported: JPG, PNG, GIF, etc.)
            </Typography>
          </>
        ) : (
          <Stack spacing={1} alignItems="center" sx={{ width: "100%" }}>
            {/* Preview Uploaded Image */}
            <Avatar
              src={preview}
              alt="Uploaded Preview"
              sx={{ width: 80, height: 80 }}
            />
            {/* File Name & Discard Option */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{
                width: "100%",
                border: "1px solid lightgray",
                padding: 1,
                borderRadius: 1,
              }}
            >
              <Typography variant="body1" color="textPrimary" noWrap>
                {uploadedImage.name}
              </Typography>
              <IconButton
                onClick={handleDiscard}
                color="error"
                title="Remove Image"
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};