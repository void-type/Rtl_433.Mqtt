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

import type {
  AppVersion,
  EntityMessageOfLong,
  IItemSetOfIFailure,
  MqttDiscoveryClientStatus,
  MqttDiscoverySetupRequest,
  TemperatureCheckLimitResponse,
  TemperatureDeviceResponse,
  TemperatureDeviceSaveRequest,
  TemperatureLocationCreateRequest,
  TemperatureLocationResponse,
  TemperatureLocationsCheckLimitsParams,
  TemperatureLocationUpdateRequest,
  TemperatureReadingResponse,
  TemperatureTimeSeriesRequest,
  TemperatureTimeSeriesResponse,
  WebClientInfo,
} from './data-contracts';
import { ContentType, HttpClient, type RequestParams } from './http-client';

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags App
   * @name AppGetInfo
   * @summary Get information to bootstrap the SPA client like application name and user data.
   * @request GET:/api/app/info
   * @response `200` `WebClientInfo`
   */
  appGetInfo = (params: RequestParams = {}) =>
    this.request<WebClientInfo, any>({
      path: `/api/app/info`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags App
   * @name AppGetVersion
   * @summary Get the version of the application.
   * @request GET:/api/app/version
   * @response `200` `AppVersion`
   */
  appGetVersion = (params: RequestParams = {}) =>
    this.request<AppVersion, any>({
      path: `/api/app/version`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags MqttDiscovery
   * @name MqttDiscoveryStatus
   * @request GET:/api/mqtt-discovery/status
   * @response `200` `MqttDiscoveryClientStatus`
   */
  mqttDiscoveryStatus = (params: RequestParams = {}) =>
    this.request<MqttDiscoveryClientStatus, any>({
      path: `/api/mqtt-discovery/status`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags MqttDiscovery
   * @name MqttDiscoverySetup
   * @request POST:/api/mqtt-discovery/setup
   * @response `200` `MqttDiscoveryClientStatus`
   * @response `400` `IItemSetOfIFailure`
   */
  mqttDiscoverySetup = (data: MqttDiscoverySetupRequest, params: RequestParams = {}) =>
    this.request<MqttDiscoveryClientStatus, IItemSetOfIFailure>({
      path: `/api/mqtt-discovery/setup`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags MqttDiscovery
   * @name MqttDiscoveryTeardown
   * @request POST:/api/mqtt-discovery/teardown
   * @response `200` `MqttDiscoveryClientStatus`
   */
  mqttDiscoveryTeardown = (params: RequestParams = {}) =>
    this.request<MqttDiscoveryClientStatus, any>({
      path: `/api/mqtt-discovery/teardown`,
      method: 'POST',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureDevices
   * @name TemperatureDevicesGetAll
   * @request GET:/api/temperatures-devices/all
   * @response `200` `(TemperatureDeviceResponse)[]`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureDevicesGetAll = (params: RequestParams = {}) =>
    this.request<TemperatureDeviceResponse[], IItemSetOfIFailure>({
      path: `/api/temperatures-devices/all`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureDevices
   * @name TemperatureDevicesSave
   * @request POST:/api/temperatures-devices
   * @response `200` `EntityMessageOfLong`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureDevicesSave = (data: TemperatureDeviceSaveRequest, params: RequestParams = {}) =>
    this.request<EntityMessageOfLong, IItemSetOfIFailure>({
      path: `/api/temperatures-devices`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureDevices
   * @name TemperatureDevicesDelete
   * @request DELETE:/api/temperatures-devices/{id}
   * @response `200` `EntityMessageOfLong`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureDevicesDelete = (id: number, params: RequestParams = {}) =>
    this.request<EntityMessageOfLong, IItemSetOfIFailure>({
      path: `/api/temperatures-devices/${id}`,
      method: 'DELETE',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureLocations
   * @name TemperatureLocationsGetAll
   * @request GET:/api/temperatures-locations/all
   * @response `200` `(TemperatureLocationResponse)[]`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureLocationsGetAll = (params: RequestParams = {}) =>
    this.request<TemperatureLocationResponse[], IItemSetOfIFailure>({
      path: `/api/temperatures-locations/all`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureLocations
   * @name TemperatureLocationsCheckLimits
   * @request GET:/api/temperatures-locations/check-limits
   * @response `200` `(TemperatureCheckLimitResponse)[]`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureLocationsCheckLimits = (
    query: TemperatureLocationsCheckLimitsParams,
    params: RequestParams = {}
  ) =>
    this.request<TemperatureCheckLimitResponse[], IItemSetOfIFailure>({
      path: `/api/temperatures-locations/check-limits`,
      method: 'GET',
      query: query,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureLocations
   * @name TemperatureLocationsCreate
   * @request POST:/api/temperatures-locations/create
   * @response `200` `EntityMessageOfLong`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureLocationsCreate = (
    data: TemperatureLocationCreateRequest,
    params: RequestParams = {}
  ) =>
    this.request<EntityMessageOfLong, IItemSetOfIFailure>({
      path: `/api/temperatures-locations/create`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureLocations
   * @name TemperatureLocationsUpdate
   * @request POST:/api/temperatures-locations/update
   * @response `200` `EntityMessageOfLong`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureLocationsUpdate = (
    data: TemperatureLocationUpdateRequest,
    params: RequestParams = {}
  ) =>
    this.request<EntityMessageOfLong, IItemSetOfIFailure>({
      path: `/api/temperatures-locations/update`,
      method: 'POST',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureReadings
   * @name TemperatureReadingsGetCurrentReadings
   * @request GET:/api/temperatures-readings/current
   * @response `200` `(TemperatureReadingResponse)[]`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureReadingsGetCurrentReadings = (params: RequestParams = {}) =>
    this.request<TemperatureReadingResponse[], IItemSetOfIFailure>({
      path: `/api/temperatures-readings/current`,
      method: 'GET',
      format: 'json',
      ...params,
    });
  /**
   * No description
   *
   * @tags TemperatureReadings
   * @name TemperatureReadingsGetTimeSeries
   * @request GET:/api/temperatures-readings/time-series
   * @response `200` `(TemperatureTimeSeriesResponse)[]`
   * @response `400` `IItemSetOfIFailure`
   */
  temperatureReadingsGetTimeSeries = (
    data: TemperatureTimeSeriesRequest,
    params: RequestParams = {}
  ) =>
    this.request<TemperatureTimeSeriesResponse[], IItemSetOfIFailure>({
      path: `/api/temperatures-readings/time-series`,
      method: 'GET',
      body: data,
      type: ContentType.Json,
      format: 'json',
      ...params,
    });
}
