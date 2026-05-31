/**
 * TODO: Handle 404 errors
 *
 * Return 404 with { error: { message: "Route not found" } }
 */
/**
 * Handle 404 errors
 */
export function notFound(req, res) {
  return res.status(404).json({
    error: {
      message: 'Route not found',
    },
  });
}