import mysql.connector
import requests
import random
import time

while 1:
    id = input('id: ')
    pw = input('pw: ')

    session = requests.session()
    url_login = 'http://localhost:3000/login'
    params = {'id': id, 'password': pw}

    txt = session.post(url_login, params).text
    if txt == 'login success': print('login success\n'); break
    else: print(txt, '\n')


db = mysql.connector.connect(
    host='localhost',
    user='root',
    port=3306,
    passwd='',
    database='autoinven'
)
cursor = db.cursor()
sql_monitor = "INSERT INTO monitor VALUES (now(), %s, %s, %s, %s, %s)"
sql_warehouse = "UPDATE warehouse SET received = 2 WHERE rfid = %s"

rand = random.Random()

while 1:
    rfid = 'FFFFFFFF'
    temp = rand.randint(-20, 40)
    humid = rand.randint(0, 100)
    fire = rand.randint(0, 1)
    gas = rand.randint(0, 1)

    try: cursor.execute(sql_monitor, (id, temp, humid, fire, gas))
    except mysql.connector.errors.IntegrityError as e: print(e)

    if rfid != 'FFFFFFFF': cursor.execute(sql_warehouse, (rfid,))

    print(f'{rfid}, {temp}, {humid}, {fire}, {gas}\t\tok')
    db.commit()

    time.sleep(1)


# monitor 테이블

# CREATE TABLE IF NOT EXISTS monitor (
#             time TIMESTAMP NOT NULL,
#             id VARCHAR(21) NOT NULL,
#             temp TINYINT(1) NOT NULL,
#             humid TINYINT(1) NOT NULL,
#             fire TINYINT(1) NOT NULL,
#             gas TINYINT(1) NOT NULL,
#             PRIMARY KEY (time),
#             FOREIGN KEY (id) REFERENCES users(id)
#             );
