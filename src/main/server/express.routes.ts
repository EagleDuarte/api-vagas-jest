import { Router, Express } from "express";
import { candidateRoutes } from "../../app/features/candidate/routes/candidate.routes";
import { candidaciesRoutes } from "../../app/features/candidacy/routes/candidacies.routes";
import { loginRoutes } from "../../app/features/login/routes/login.routes";
import { recruiterRoutes } from "../../app/features/recruiter/routes/recruiter.routes";
import { jobRoutes } from "../../app/features/job-vaga/routes/job.routes";

export const createRoutes = (app: Express) => {
    app.get("/", (req, res) => {
        return res.status(200).send({
            ok: true,
            message: "Everything alright!",
        });
    });

    app.use("/recrutador", recruiterRoutes());
    app.use("/auth", loginRoutes());
    app.use("/candidato", candidateRoutes());
    app.use("/vaga", jobRoutes());
    app.use('/candidatura', candidaciesRoutes());
};
