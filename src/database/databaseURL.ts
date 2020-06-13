const hostname = process.env.DB_HOSTNAME;
const password = process.env.DB_PASSWORD;
const port = process.env.DB_PORT;
const protocol = process.env.DB_PROTOCOL;
const user = process.env.DB_USER;

const url = new URL(`${protocol}//${user}:${password}@${hostname}:${port}/`);

url.searchParams.append("ssl", "true");
url.searchParams.append("ssl_ca_certs", "rds-combined-ca-bundle.pem");
url.searchParams.append("readPreference", "secondaryPreferred");
url.searchParams.append("retryWrites", "false");
url.searchParams.append("tlsAllowInvalidHostnames", "true");

export { url };
