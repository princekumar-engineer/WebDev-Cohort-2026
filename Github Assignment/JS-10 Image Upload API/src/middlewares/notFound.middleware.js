/**
 * Handle 404 errors for unrecognized routes
 *
 * Requirements:
 * Return 404 with { error: { message: 'Route not found' } }
 */
export function notFound(req, res) {
  return res.status(404).json({
    error: {
      message: 'Route not found',
    },
  });
}