import { Request, Response, NextFunction, response } from 'express'

export const createCandidateValidator = (req: Request, res: Response, next: NextFunction) => {

  try {
    
    const { nome, username, senha } = req.body

    if (!nome) return res.status(400).send({
      ok: false,
      message: "Nome necessário!"
    })

    if (!username) return res.status(400).send({
      ok: false,
      message: "username necessário!"
    })

    if (!senha) return res.status(400).send({
      ok: false,
      message: "senha necessário!"
    })

    next()

  } catch (error: any) {
    return res.status(500).send({
      ok: false,
      message: error.toString()
    })
  }
  
}