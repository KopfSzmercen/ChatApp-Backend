import jwt from "jsonwebtoken";
require("dotenv").config();
import express from "express";

const TOKEN_SECRET = process.env.TOKEN_SECRET || "dfdsfdsfdsf";

export const generateToken = (username: string, userId: string) => {
  const token = jwt.sign({ username, userId }, TOKEN_SECRET, {
    expiresIn: "40m"
  });
  return token;
};

export const verifyToken = (
  token: string
): { success: boolean; userId?: string; username?: string } => {
  let response: any = { success: true };
  jwt.verify(token, TOKEN_SECRET, (error, userData) => {
    if (error) {
      response.success = false;
    }
    if (userData) {
      response.userId = userData!.userId!;
      response.username = userData!.username!;
    } else {
      response.success = false;
    }
  });

  return response;
};

export const getTokenFromReq = (req: express.Request) => {
  const authToken = req.headers["authorization"]?.split(" ")[1];
  if (!authToken) return null;
  return authToken;
};
