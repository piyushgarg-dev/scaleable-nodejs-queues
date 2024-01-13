const { Worker } = require('bullmq')

async function mockSendEmail(payload) {
    const { from, to, subject, body } = payload;
    return new Promise((resolve, reject) => {
        console.log(`Sending Email to ${to}....`);
        setTimeout(() => resolve(1), 2 * 1000);
    });
}

const emailWorker = new Worker('email-queue', async (job) => {
    const data = job.data;
    console.log('Job Rec.. ', job.id);

    await mockSendEmail({
        from: data.from,
        to: data.to,
        subject: data.subject,
        body: data.body
    })
}, {
    connection: {
        host: "redis-17528355-piyushgarg-2e77.a.aivencloud.com",
        port: 23898,
        username: "default",
        password: "AVNS_CViKExNgbBwxnUSjWR0",
    },
    limiter: {
        max: 50,
        duration: 10 * 1000
    }
})

module.exports = emailWorker