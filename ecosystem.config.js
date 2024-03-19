module.exports = {
  apps: [
    {
      name: "backend_closetcompass",
      script: "npm",
      args: "run start",
      cwd: "./backend/",
    },
    // {
    //   name: "frontend",
    //   script: "npm",
    //   args: "run build",
    //   cwd: "./frontend/",
    //   autorestart: false
    // },
  ],
};
