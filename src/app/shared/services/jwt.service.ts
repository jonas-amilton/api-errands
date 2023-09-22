import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

/**
 * Classe que fornece métodos para manipulação de tokens JWT.
 * @class JwtService
 * @author Jonas Silva
 */
export class JwtService {
  /**
   * Cria um novo token JWT com base nos dados fornecidos.
   * @param {any} data - Os dados a serem incluídos no token.
   * @returns {string} - O token JWT gerado.
   */
  public createToken(data: any): string {
    return jwt.sign(data, process.env.JWT_SECRET!);
  }

  /**
   * Verifica se um token JWT é válido.
   * @param {string} token - O token JWT a ser verificado.
   * @returns {boolean} - True se o token for válido, false caso contrário.
   */
  public verifyToken(token: string): boolean {
    try {
      jwt.verify(token, process.env.JWT_SECRET!);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Decodifica um token JWT para obter os dados contidos nele.
   * @param {string} token - O token JWT a ser decodificado.
   * @returns {any | null} - Os dados decodificados do token ou null se ocorrer um erro.
   */
  public decodeToken(token: string): any | null {
    const result = jwt.decode(token);

    if (!result) {
      return null;
    }

    return result;
  }
}



// Copyright [Jonas Silva]