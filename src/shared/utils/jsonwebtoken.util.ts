import jwt from 'jsonwebtoken';

/**
 * A helper that provides a set of json web token utility methods.
 */
export class JWT {
  /**
   * Generates and returns a signed json web token based on the provided data.
   * @param id The id of the access token.
   * @param userId The id of the user that owns the access token.
   */
  static async genToken(id: number, userId: number): Promise<string> {
    const payload = {
      id,
      userId,
    };

    return jwt.sign(payload, process.env.JWT_PRIVATE_KEY!, {
      expiresIn: process.env.JWT_LIFE_TIME,
    });
  }

  /**
   * Verifies then Decodes and returns the given token if it was valid otherwise returns `null`.
   * @param token The json web token to be decoded.
   * @param ignoreExpiration if `true` do not validate the expiration of the token, default to `false` and the expiration will be validated.
   */
  static async verifyAndDecode(
    token: string,
    ignoreExpiration = false
  ): Promise<{ id: number; userId: number } | null> {
    try {
      return jwt.verify(token, process.env.JWT_PRIVATE_KEY!, { ignoreExpiration }) as never;
    } catch (error) {
      return null;
    }
  }
}
