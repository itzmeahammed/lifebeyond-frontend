import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { getWaveBlob } from "webm-to-wav-converter";
import { VOICE_ASSISTANT_RECOGNIZE_URL } from "../helper/apiurls";
import Cookies from "js-cookie";
import {
  Modal,
  Box,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

const VoiceRecorder = ({ isrecordStart, setisrecordStart }) => {
  const [recording, setRecording] = useState(false);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [audioUrl, setAudioUrl] = useState(""); // To store the audio URL for playback
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const token = Cookies.get("token");

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        setLoading(true);
        const webmBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        audioChunksRef.current = [];

        const wavBlob = await getWaveBlob(webmBlob);
        sendAudioToBackend(wavBlob);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const sendAudioToBackend = async (audioBlob) => {
    const formData = new FormData();
    formData.append(
      "file",
      new File([audioBlob], "recording.wav", { type: "audio/wav" })
    );

    try {
      const res = await axios.post(VOICE_ASSISTANT_RECOGNIZE_URL, formData, {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob", // This tells axios to expect a binary blob
      });

      // Create an object URL from the blob response to play the audio
      const audioBlobUrl = URL.createObjectURL(res.data);
      setAudioUrl(audioBlobUrl); // Store the audio URL to be used for playback

      setResponse(res.data.Response); // Show any textual response
      setResponseModalOpen(true);
    } catch (error) {
      console.error("Error uploading audio:", error);
      setResponse("Error processing audio.");
      setResponseModalOpen(true);
    } finally {
      setLoading(false);
      setisrecordStart(false);
    }
  };

  useEffect(() => {
    if (audioUrl) {
      // Automatically play the audio once it is set
      const audioElement = new Audio(audioUrl);
      audioElement.play();
    }
  }, [audioUrl]); // Effect runs whenever audioUrl changes

  useEffect(() => {
    isrecordStart && startRecording();
  }, [isrecordStart]);

  return (
    <>
      {/* 🎤 Recording Modal */}
      <Modal
        open={isrecordStart}
        onClose={loading ? null : () => setisrecordStart(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#000",
            color: "#fff",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          {isrecordStart && (
            <img
              src='https://i.pinimg.com/originals/31/2e/fc/312efcd060aff82a2372e176801463a0.gif'
              alt='Voice Assistant'
              style={{ width: "300px" }}
            />
          )}
          <Box mt={2}>
            {recording ? (
              <Button
                variant='contained'
                sx={{
                  backgroundColor: "#D32F2F",
                  "&:hover": { backgroundColor: "#B71C1C" },
                }}
                onClick={stopRecording}
                disabled={loading}
              >
                ⏹ Stop & Send
              </Button>
            ) : null}
          </Box>
          {loading && <CircularProgress sx={{ mt: 2 }} />}
        </Box>
      </Modal>

      {/* ✅ Response Modal */}
      <Modal
        open={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography variant='h6' gutterBottom>
            Assistant Response
          </Typography>
          <Typography variant='body1'>{response}</Typography>

          {/* Add audio player to play the response */}
          {audioUrl && (
            <audio autoPlay>
              <source src={audioUrl} type='audio/mp3' />
              Your browser does not support the audio element.
            </audio>
          )}

          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            onClick={() => setResponseModalOpen(false)}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default VoiceRecorder;
