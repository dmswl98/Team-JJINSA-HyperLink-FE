import { rest } from 'msw';
import { myInfo } from './member';

export const authHandlers = [
  rest.get('/members/oauth/google', (req, res, ctx) => {
    const code = req.url.searchParams.get('code');

    if (!code) {
      return res(ctx.status(400));
    }

    return res(
      ctx.status(200),
      ctx.json({
        accessToken:
          'AAAAOT42pxCMcDQrNBbEwEVUt-eAnKfUje51bNjQYt2meoaeJ_1T5kVNAW9WTmwP-vhwePbF5wn7Gr-HSNsRxmCa_U4',
        joinCheck: true, // 회원가입: true, 로그인: false
        email: 'mswtest123@gmail.com',
      })
    );
  }),

  rest.post('/members/signup', async (req, res, ctx) => {
    const {
      email,
      gender,
      nickname,
      attentionCategory,
      career,
      careerYear,
      birthYear,
    } = await req.json();

    if (
      !email ||
      !gender ||
      !nickname ||
      !attentionCategory.length ||
      !career ||
      !careerYear ||
      !birthYear
    ) {
      return res(ctx.status(400));
    }

    myInfo.email = email;
    myInfo.nickname = nickname;
    myInfo.career = career;
    myInfo.careerYear = careerYear;

    return res(
      ctx.status(201),
      ctx.json({
        accessToken:
          'AAAAOT42pxCMcDQrNBbEwEVUt-eAnKfUje51bNjQYt2meoaeJ_1T5kVNAW9WTmwP-vhwePbF5wn7Gr-HSNsRxmCa_U4',
      })
    );
  }),

  rest.post('/members/login', (req, res, ctx) => {
    if (!req.headers.all().authorization) {
      return res(ctx.status(400));
    }

    return res(
      ctx.status(200),
      ctx.json({
        accessToken:
          'BBBBOT42pxCMcDQrNBbEwEVUt-eAnKfUje51bNjQYt2meoaeJ_1T5kVNAW9WTmwP-vhwePbF5wn7Gr-HSNsRxmCa_U4',
      })
    );
  }),

  rest.post('/members/logout', (req, res, ctx) => {
    if (!req.headers.all().authorization) {
      return res(ctx.status(400));
    }

    return res(ctx.status(200));
  }),

  rest.get('/members/access-token', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        accessToken:
          'BBBBOT42pxCMcDQrNBbEwEVUt-eAnKfUje51bNjQYt2meoaeJ_1T5kVNAW9WTmwP-vhwePbF5wn7Gr-HSNsRxmCa_U4',
      })
    );
  }),
];