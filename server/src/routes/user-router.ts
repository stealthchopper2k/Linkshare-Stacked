import * as Model from "../Models/user.model";
import { Request, Response } from "express";
import { User } from "../utils/interface/user";
import { raise } from "../utils/helper";

export async function registerUser(req: Request, res: Response) {
  const id = req.params.id;
  const dashboard = req.body;

  if (!id || !dashboard) raise(id || dashboard, "User ID is required");

  try {
    const userInfo = await Model.createUser(id, dashboard);
    res.status(200).json(userInfo);
  } catch (e) {
    if (e instanceof Error) res.status(500).json({ error: e.message });
  }
}

export async function returnUser(req: { params: { id: any } }, res: any) {
  try {
    const id = req.params.id;

    if (!id) raise(id, "User ID is required to get user");

    const result = await Model.getUser(id);
    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Error) res.status(500).json({ error: e.message });
  }
}

export async function postUser(
  req: { params: { id: any }; body: User },
  res: any
) {
  const id = req.params.id;
  const user = req.body;

  if (!id) raise(id, "UserID is required");

  try {
    const result = await Model.updateUser(id, user);
    res.status(200).json(result);
  } catch (e) {
    if (e instanceof Error) res.status(500).json({ error: e.message });
  }
}
