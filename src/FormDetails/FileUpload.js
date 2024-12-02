import React from "react";
import {
  Box,
  Button,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { UploadFile as UploadFileIcon, Delete as DeleteIcon } from "@mui/icons-material";

export const FileUpload = ({ uploadedFile, setUploadedFile }) => {
  // Handle file upload
  const handleFileUpload = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadedFile(event.target.files[0]); // Save the uploaded filea
    }
  };

  // Handle file discard
  const handleDiscard = () => {
    setUploadedFile(null); // Reset the uploaded file
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
        Upload Document
      </Typography>
      <Stack spacing={1} alignItems="center">
        {/* File Input */}
        {!uploadedFile ? (
          <>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Choose File
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt" // Accept specific file types
                hidden
                onChange={handleFileUpload}
              />
            </Button>
            <Typography variant="body2" color="textSecondary">
              (Supported: PDF, DOC, DOCX, TXT)
            </Typography>
          </>
        ) : (
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              border: "1px solid lightgray",
              padding: 1,
              borderRadius: 1,
            }}
          >
            {/* Display Uploaded File Name */}
            <Typography variant="body1" color="textPrimary" noWrap>
              {uploadedFile.name}
            </Typography>
            {/* Discard Button */}
            <IconButton
              onClick={handleDiscard}
              color="error"
              title="Remove File"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};