/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AppVersion {
  version?: string | null;
  isPublicRelease?: boolean;
  isPrerelease?: boolean;
  gitCommitId?: string | null;

  /** @format date-time */
  gitCommitDate?: string;
  assemblyConfiguration?: string | null;
}

export interface DomainUser {
  login?: string | null;
  authorizedAs?: string[] | null;
}

export interface GraphCurrentReading {
  location?: string | null;

  /** @format double */
  temperatureCelsius?: number | null;

  /** @format double */
  humidity?: number | null;

  /** @format date-time */
  time?: string;
}

export interface GraphPoint {
  /** @format double */
  temperatureCelsius?: number | null;

  /** @format date-time */
  time?: string;
}

export interface GraphTimeSeries {
  location?: string | null;

  /** @format double */
  min?: number | null;

  /** @format double */
  max?: number | null;

  /** @format double */
  average?: number | null;
  points?: GraphPoint[] | null;
}

export interface GraphTimeSeriesRequest {
  /** @format date-time */
  startTime?: string;

  /** @format date-time */
  endTime?: string;
}

export interface IFailure {
  message?: string | null;
  uiHandle?: string | null;
}

export interface IFailureIItemSet {
  /** @format int32 */
  count?: number;
  items?: IFailure[] | null;
  isPagingEnabled?: boolean;

  /** @format int32 */
  page?: number;

  /** @format int32 */
  take?: number;

  /** @format int32 */
  totalCount?: number;
}

export interface InactiveDevice {
  /** @format int64 */
  id?: number;
  deviceModel?: string | null;
  deviceId?: string | null;
  deviceChannel?: string | null;
  locationName?: string | null;

  /** @format double */
  lastReadingTemperatureCelsius?: number | null;

  /** @format date-time */
  lastReadingTime?: string | null;
}

export interface LostDevice {
  /** @format int64 */
  id?: number;
  deviceModel?: string | null;
  deviceId?: string | null;
  deviceChannel?: string | null;

  /** @format double */
  lastReadingTemperatureCelsius?: number | null;

  /** @format date-time */
  lastReadingTime?: string | null;
}

export interface WebClientInfo {
  antiforgeryToken?: string | null;
  antiforgeryTokenHeaderName?: string | null;
  applicationName?: string | null;
  user?: DomainUser;
}
