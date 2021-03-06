// API endpoint definitions
export const AppConfig = {
    apiUrl: 'http://localhost:3000',
    // apiUrl: 'http://34.254.194.245:3000',

    apiAuth: 'http://localhost:3000/auth',
    // apiAuth: 'http://34.254.194.245:3000/auth',

    apiSignup: '/signup',
    apiLogin: '/login',
    apiAccount: '/account',
    apiKeys: '/keys',
    apiSetKey: '/keys/upload',
    apiKeyGen: '/keys/generate',
    apiPollCreate: '/poll/create',
    apiPollFetch: '/poll/fetch',
    apiAllPolls: '/poll/all',
    apiPollCast: '/poll/cast',
    apiPollCastSecure: '/poll/cast-secure',
    apiResult: '/poll/result',
    apiCanAccess: '/poll/can-access',
    apiGetStatsLine: '/poll/getStatsLine',
    apiGetPoll: '/poll/get-poll',
    apiGetVotes: '/poll/get-votes',
    apiClosePoll: '/poll/close',
};
