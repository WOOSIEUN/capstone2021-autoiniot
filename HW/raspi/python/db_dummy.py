import mysql.connector
import requests
import random
import time

# 서버 ip 입력
ip = '192.168.0.24'

while 1:
    id = input('id: ')
    pw = input('pw: ')

    session = requests.session()
    url_login = f'http://{ip}:3000/login'
    params = {'id': id, 'password': pw}

    txt = session.post(url_login, params).text
    if txt == 'login success': print('login success\n'); break
    else: print(txt, '\n')


db = mysql.connector.connect(
    host=ip,
    user='root',
    port=3306,
    passwd='',
    database='autoinven'
)
cursor = db.cursor()
sql_monitor = "INSERT INTO monitor VALUES (now(), %s, %s, %s, %s, %s)"
sql_warehouse = "UPDATE warehouse SET received = 1 WHERE rfid = %s"

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
