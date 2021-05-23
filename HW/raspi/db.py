import mysql.connector
import requests
import serial

# 로그인
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

sensor = serial.Serial('COM4', 9600)

while 1:
    data = sensor.readline().decode()[:-2].split('#')
    if (len(data) != 5): continue
    rfid, temp, humid, fire, gas = data

    try: cursor.execute(sql_monitor, (id, temp, humid, fire, gas))
    except mysql.connector.errors.IntegrityError as e: print(e)  # 시간 중복 except

    if rfid != 'FFFFFFFF': cursor.execute(sql_warehouse, (rfid,))  # db에 rfid 없는 경우 자동 무시됨

    print(f'{rfid}, {temp}, {humid}, {fire}, {gas}\t\tok')  # 확인용
    db.commit()
