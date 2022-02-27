import * as visitsService from '@services/visits';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);
import { groupBy, map, unionBy } from 'lodash';

export default [
  ...hasPermissions(['getVisitByTime']),
  async (req, res) => {
    try {
      const {
        startTime,
        endTime,
        hallId = null,
        boothId = null,
        stageId = null,
        infoDeskId = null,
      } = req.query;
      const range = moment.range(startTime, endTime);
      const hourRange = Array.from(range.by('hour', { excludeEnd: true })).map(
        (h) => ({
          name: new Date(h).getTime(),
          visits: 0,
        })
      );
      const visits = await visitsService.findAllVisitByField({
        createdAt: {
          $gte: startTime,
          $lt: endTime,
        },
        hallId,
        boothId: boothId || infoDeskId,
        stageId,
      });
      const groups = groupBy(
        visits.map((v) => v.createdAt),
        (date) => moment(date).startOf('hour').format()
      );
      const visitGroups = map(groups, (group, day) => ({
        name: new Date(day).getTime(),
        visits: group.length,
      }));
      const visitsByTime = unionBy(visitGroups, hourRange, 'name').sort(
        (a, b) => a.name - b.name
      );
      return buildSuccessResponse(res, successData({ visitsByTime }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
