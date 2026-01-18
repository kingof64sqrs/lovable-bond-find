import app from './app';

const PORT: number = parseInt(process.env.PORT || '3000', 10);
const HOST: string = '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`\n✓ Server running on http://${HOST}:${PORT}`);
  console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`✓ API Health: http://localhost:${PORT}/api/health\n`);
});
