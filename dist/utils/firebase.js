import firebaseAdmin from "firebase-admin";
export const firebaseServiceAccount = {
    type: "service_account",
    project_id: "rawfoods-691aa",
    private_key_id: "29b38633d8e360e9bf9f4f3f342f2711ee8cc4da",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC6D0MVOOZA/kd4\nqyvwdvnxZ1eaMniKYmtD7y4bVT5gpf3i8NUC3qVC4qhvevfyFwPngkrfU5vnWFjL\n3Wmt9AUGPaxY2/4Wem4pMFTgy9gwKQJLPYQ3mJIjMpJ9K8EjKGvXHmk89Id6RY7O\n2ek8FO3fJZJLk3IGDXyRygjkcIHQNzv1cbcGgTv3lPwnNvX5bxHyqNt9ploxmeAV\n8iVHSPyt+rLYmuxiaHag/Llq9tl3PVgz4gJNyDOzsWbnmnFYAvCGi+1ZQr8B32Th\nw7nbA2I9UVVyTLA/on3XMno4JOlXvAdxG2TconDcNREvEn52sh35wcMe1ADpWfHO\ntX+N17YjAgMBAAECggEAGoJZKvln6QOxuDIfOQwikXAJbblaLlFWeh/mYFOVZxzP\nXxm0J8wEHNMBb5zEHfSEhGQuecJGWMBgKm+6AmRdoOWBnEl/2sEH2AuAVGUGwNne\n70xs/aTZ0XT/pSDqTDGSp9w330zxzoyBi9xFXF+ZAq2uOeFgohci0/zGppGXFUzC\nxSA/xSULuQe+05Xka5C18cmcvfGc1XT5Tccf3QqpgQOm4Oh654Y3KxobxKsqPFgo\nl1KoO4OFSnPdESKcWX5R+KIbDRj+HJTJW/2hRtq5kq+BAMBq6mDt6kP8kLFbVFYf\nDTMyZf0OBDVU8lDCwHVrmDdarx7q3027FqHLGgsp4QKBgQDz8N46RPpCI+RqSvwg\nFJzk/TKI43GCDaLWUe2dMsnyB2yVqCrLvv9I8HXJAogWIhfdFfiBpKtckwMa0UTa\nqAkqJM8LS3G4UbR1ZY5YaRNt7EyPXvj93nTUiwlAbKbcdcB8PsVzqzAKEqOXPBHC\np/Zyh7YNshRv5KTI6ofwxKX2QwKBgQDDQeRo08Of2661miMCtP1XpWeq9rMMOsfY\n9S1ZwXASL21JMNbjmIJzeBjBpExNpdJlwpFbiMEjWIYQLr5jUe7ZuaxxHtrEUyyf\ni5bhJpjh0BrdupGZKYOFbn0t4KjxS+8yHLYMI2k3hzKOiOxjjGF+9XCeAw45YEL8\nxLwTPRpyoQKBgQC6axE40Gu7TbiJrkIctgPsTr5mtAGTVJ5jUHrYje6cAiZt+/Sw\nfYaTlAc/FKsw1t8LunWNhWzbMxHFVbVbr9xJE5YR2JbQN8hDiteMIsiRUWp0iiyX\nvX/kyVfJnv6pLWdqy4GTUnhEylewBFzCOB9zCNkMgFFz7PQtAmXejjkSBwKBgFrA\nOWTvZ7DY7e7B4RvU+xrNac1wM++vMkuISLe6zFfnayflZzsJGziHzRnTPxOnyo45\nTE361amT71t+HkcTQaw4PAmniY5OCiNtQYcL5Wquyo3btOg2/0X5AH1eOadM37Ou\n3H3vx2tjjv/oa9Yo3PehI+KNEQNh1kCdP7zBXZWBAoGBAOxT/+GD6Z//nvlHeg6R\nEGPyvHJyUMtlRoloo5eZjUD4OXQH8qCUIUWm6/tT8wGTr54AHNjWtotFCODAowRH\nEQKAKoqmvhebtKkbqwWe5RCS/xShGCqQR7BUR4e2NksPj4kHiU6pfbem1HsvCRwb\nncaoHJqpjmRZKnA21UcPri0B\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-fbsvc@rawfoods-691aa.iam.gserviceaccount.co",
    client_id: "112222836642079695542",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40rawfoods-691aa.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
};
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseServiceAccount),
});
export default firebaseAdmin;
