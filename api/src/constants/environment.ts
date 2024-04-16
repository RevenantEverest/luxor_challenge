import dotenv from 'dotenv';

dotenv.config();

/**
 * Environment variable for database type
 */
export const DB_TYPE = process.env.DB_TYPE as string;

/**
 * Environment variable for database host
 */
export const DB_HOST = process.env.DB_HOST as string;

/**
 * Environment variable for database user login username
 */
export const DB_USERNAME = process.env.DB_USERNAME as string;

/**
 * Environment variable for database user login password
 */
export const DB_PASSWORD = process.env.DB_PASSWORD as string;

/**
 * Environment variable for database name
 */
export const DB_NAME = process.env.DB_NAME as string;

/**
 * Environment variable for database port
 */
export const DB_PORT = process.env.DB_PORT as string;

/**
 * Environment variable for the base url of the api
 */
export const BASE_URL = process.env.BASE_URL as string;

/**
 * Environment variable for the api port
 */
export const API_PORT = process.env.API_PORT as string;

/**
 * Check if the current environment is set to DEV
 */
export const IS_DEV = process.env.ENVIRONMENT === "DEV";

/**
 * Check if the current environment is set to STAGING
 */
export const IS_STAGING = process.env.ENVIRONMENT === "STAGING";

/**
 * Check if the current environment is set to PROD
 */
export const IS_PROD = process.env.ENVIRONMENT === "PROD";

/**
 * Check if the current environment is set to TEST
 */
export const IS_TEST = process.env.ENVIRONMENT === "TEST";