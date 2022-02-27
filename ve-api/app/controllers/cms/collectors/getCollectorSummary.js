import * as collectorsService from '@services/collectors';
import { COMMON_CODE } from '@constants/codes';
import {
  errorData,
  successData,
  buildSuccessResponse,
  buildErrorResponse,
} from '@helpers/response';
import { hasPermissions } from '@helpers/jwt';
import { map } from 'lodash';

export default [
  ...hasPermissions(['getCollectorSummary']),
  async (req, res) => {
    try {
      const sceneId = req.params.sceneId;
      const sceneIdKey = req.params.sceneIdKey;
      const reportTempate = {
        boothId: {
          totalInteraction: {
            name: 'Total Interactions',
            count: 0,
            toolTip: 'tooltip content',
          },
          timeSpent: {
            name: 'Total Time Spent',
            count: 0,
            toolTip: 'tooltip content',
          },
          timesVisited: {
            name: 'Total Times Visited',
            count: 0,
            toolTip: 'tooltip content',
          },
          chatWithUs: {
            name: 'Live Chat',
            count: 0,
          },
          websiteUrl: {
            name: 'Website',
            count: 0,
          },
          calendlyUrl: {
            name: 'Appointment',
            count: 0,
          },
          resourceHub: {
            name: 'Resource Hub',
            count: 0,
          },
          meetingUrl: {
            name: 'Meeting Room',
            count: 0,
          },
          booth_image_1: {
            name: 'Booth Image 1',
            count: 0,
          },
          booth_image_2: {
            name: 'Booth Image 2',
            count: 0,
          },
          booth_image_3: {
            name: 'Booth Image 3',
            count: 0,
          },
          video_1: {
            name: 'Booth Image 4',
            count: 0,
          },
          video_2: {
            name: 'Booth Image 5',
            count: 0,
          },
          Brochure: {
            name: 'Brochure rack',
            count: 0,
          },
        },
        infoDeskId: {
          totalInteraction: {
            name: 'Total Interactions',
            count: 0,
          },
          timeSpent: {
            name: 'Total Time Spent',
            count: 0,
          },
          timesVisited: {
            name: 'Total Times Visited',
            count: 0,
          },
          chatWithUs: {
            name: 'Live Chat',
            count: 0,
          },
          resourceHub: {
            name: 'Resource Hub',
            count: 0,
          },
          brochure1: {
            name: 'Left Brochure',
            count: 0,
          },
          brochure2: {
            name: 'Right Brochure',
            count: 0,
          },
          help_image: {
            name: 'Centre Screen',
            count: 0,
          },
          agenda_image: {
            name: 'Pull-Up Banner',
            count: 0,
          },
        },
        hallId: {
          totalInteraction: {
            name: 'Total Interactions',
            count: 0,
          },
          timeSpent: {
            name: 'Total Time Spent',
            count: 0,
          },
          timesVisited: {
            name: 'Total Times Visited',
            count: 0,
          },
          lcd_screen: {
            name: 'Center Screen',
            count: 0,
          },
          banner1: {
            name: 'Left Banner',
            count: 0,
          },
          banner2: {
            name: 'Right Banner',
            count: 0,
          },
        },
        stageId: {
          totalInteraction: {
            name: 'Total Interactions',
            count: 0,
          },
          timeSpent: {
            name: 'Total Time Spent',
            count: 0,
          },
          timesVisited: {
            name: 'Total Times Visited',
            count: 0,
          },
          leftBanner: {
            name: 'Left Banner',
            count: 0,
          },
          rightBanner: {
            name: 'Right Banner',
            count: 0,
          },
          screen: {
            name: 'Screen',
            count: 0,
          },
        },
      };
      const reportData = reportTempate[sceneIdKey];
      const collectors = await collectorsService.findAllCollectorByField({
        [sceneIdKey === 'infoDeskId' ? 'boothId' : sceneIdKey]: sceneId,
      });
      collectors.map((collector) => {
        let totalInteraction = 0;
        if (!collector.collector['timesVisited']) {
          reportData['timesVisited'].count += 1;
        }
        map(collector.collector, (value, key) => {
          if (reportData[key]) {
            reportData[key].count += value.count;
            if (!['timeSpent', 'timesVisited'].includes(key)) {
              totalInteraction += value.count;
            }
          }
        });
        reportData.totalInteraction.count += totalInteraction;
      });
      return buildSuccessResponse(res, successData({ reportData }), 200);
    } catch (err) {
      const dataErr = errorData(COMMON_CODE.UNKNOWN_ERROR, err && err.message);
      return buildErrorResponse(res, dataErr);
    }
  },
];
