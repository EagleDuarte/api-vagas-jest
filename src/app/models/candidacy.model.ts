import { CandidateModel } from "./candidate.model";
import { JobModel } from "./job.model";

export class CandidacyModel {
    constructor(
        private _candidato: CandidateModel,
        private _vaga: JobModel,
        private _indSucesso: boolean,
        private _dtCandidatura: Date
    ) {}

    public get candidato() {
        return this._candidato;
    }

    public get vaga() {
        return this._vaga;
    }

    public get indSucesso() {
        return this._indSucesso;
    }

    public get dtCandidatura() {
        return this._dtCandidatura;
    }

    public toJson() {
        return {
            candidato: this._candidato.toJson(),
            vaga: this._vaga.toJson(),
            indSucesso: this._indSucesso,
            dtCandidatura: this._dtCandidatura,
        };
    }
}
