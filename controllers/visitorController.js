import { prisma } from "../utils/prisma.js";

export const getHomePage = async (req, res) => {
  try {
    const USERID = parseInt(process.env.USERID);

    const homeInfo = await prisma.user.findFirst({
      where: { id: USERID },
      select: { name: true },
    });

    return res.status(200).json(homeInfo);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const getAboutPage = async (req, res) => {
  try {
    const USERID = parseInt(process.env.USERID);

    const user = await prisma.user.findFirst({
      where: { id: USERID },
      select: {
        name: true,
        bio: true,
        skill: { select: { skill: true } },
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const getContactPage = async (req, res) => {
  try {
    const USERID = parseInt(process.env.USERID);

    const user = await prisma.user.findFirst({
      where: { id: USERID },
      select: {
        name: true,
        email: true,
        phonenumber: { select: { number: true } },
        sociallink: { select: { platform: true, url: true } },
      },
    });

    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};

export const getProjectsPage = async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        screenshot: true,
        _count: {
          select: { comment: true },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json(projects);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ error: "Something went wrong. Server Error" });
  }
};
