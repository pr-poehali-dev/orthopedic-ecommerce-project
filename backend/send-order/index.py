"""
Отправка уведомлений о новом заказе:
- письмо менеджеру магазина с полной информацией о заказе
- письмо покупателю с подтверждением и чеком (если указан email)
"""

import json
import os
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from datetime import datetime


def send_email(to: str, subject: str, html_body: str):
    host = os.environ["SMTP_HOST"]
    port = int(os.environ["SMTP_PORT"])
    user = os.environ["SMTP_USER"]
    password = os.environ["SMTP_PASSWORD"]

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"МедРеабилитация <{user}>"
    msg["To"] = to
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL(host, port) as server:
        server.login(user, password)
        server.sendmail(user, to, msg.as_string())


def build_items_table(items: list) -> str:
    rows = ""
    for item in items:
        cert_badge = '<span style="color:#1a7abf;font-size:11px;">✓ По сертификату</span>' if item.get("cert") else ""
        rows += f"""
        <tr style="border-bottom:1px solid #eee;">
          <td style="padding:10px 8px;">
            <strong style="font-size:13px;">{item["name"]}</strong><br>
            <span style="color:#888;font-size:12px;">{item.get("category","")}</span><br>
            {cert_badge}
          </td>
          <td style="padding:10px 8px;text-align:center;color:#555;">{item["qty"]} шт.</td>
          <td style="padding:10px 8px;text-align:right;font-weight:700;color:#1a7abf;">
            {item["price"] * item["qty"]:,} ₽
          </td>
        </tr>
        """.replace(",", " ")
    return rows


def manager_email_html(order: dict) -> str:
    items_html = build_items_table(order["items"])
    pay_label = "Электронный сертификат ФСС" if order["payMethod"] == "cert" else "Банковская карта"
    cert_info = f'<p><strong>Номер сертификата:</strong> {order.get("certNum","—")}</p>' if order["payMethod"] == "cert" else ""
    delivery = order.get("delivery", 0)
    total = order["totalPrice"] + delivery

    return f"""
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5eaf0;">
      <div style="background:linear-gradient(135deg,#1a7abf,#0ea5e9);padding:28px 32px;">
        <h1 style="color:#fff;margin:0;font-size:22px;">🛒 Новый заказ</h1>
        <p style="color:rgba(255,255,255,0.8);margin:6px 0 0;font-size:14px;">{datetime.now().strftime("%d.%m.%Y %H:%M")}</p>
      </div>
      <div style="padding:28px 32px;">
        <h2 style="font-size:16px;color:#1e2d3d;margin:0 0 16px;">Данные покупателя</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px;">
          <tr><td style="padding:4px 0;color:#888;width:140px;">Имя:</td><td style="font-weight:600;">{order["name"]}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">Телефон:</td><td style="font-weight:600;">{order["phone"]}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">Email:</td><td style="font-weight:600;">{order.get("email","—")}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">Адрес:</td><td style="font-weight:600;">{order["address"]}</td></tr>
          <tr><td style="padding:4px 0;color:#888;">Способ оплаты:</td><td style="font-weight:600;color:#1a7abf;">{pay_label}</td></tr>
        </table>
        {cert_info}

        <h2 style="font-size:16px;color:#1e2d3d;margin:24px 0 12px;">Состав заказа</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f4f8fb;">
              <th style="padding:8px;text-align:left;color:#555;">Товар</th>
              <th style="padding:8px;text-align:center;color:#555;">Кол-во</th>
              <th style="padding:8px;text-align:right;color:#555;">Сумма</th>
            </tr>
          </thead>
          <tbody>{items_html}</tbody>
        </table>

        <div style="margin-top:20px;padding:16px;background:#f4f8fb;border-radius:8px;text-align:right;">
          <span style="color:#888;font-size:13px;">Товары: {order["totalPrice"]:,} ₽ | Доставка: {"Бесплатно" if delivery==0 else f"{delivery} ₽"}</span><br>
          <strong style="font-size:20px;color:#1a7abf;">Итого: {total:,} ₽</strong>
        </div>
      </div>
    </div>
    """.replace(",", " ")


def buyer_email_html(order: dict) -> str:
    items_html = build_items_table(order["items"])
    pay_label = "Электронный сертификат ФСС" if order["payMethod"] == "cert" else "Банковская карта"
    delivery = order.get("delivery", 0)
    total = order["totalPrice"] + delivery
    cert_note = """
    <div style="margin:20px 0;padding:14px 18px;background:#eff8ff;border-left:4px solid #1a7abf;border-radius:6px;font-size:13px;color:#1a5c8a;">
      <strong>Оплата электронным сертификатом:</strong> наш менеджер свяжется с вами в течение 30 минут для подтверждения сертификата и оформления документов.
    </div>
    """ if order["payMethod"] == "cert" else ""

    return f"""
    <div style="font-family:'Helvetica Neue',Arial,sans-serif;max-width:640px;margin:0 auto;background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e5eaf0;">
      <div style="background:linear-gradient(135deg,#1a7abf,#0ea5e9);padding:28px 32px;">
        <h1 style="color:#fff;margin:0;font-size:22px;">✅ Ваш заказ принят!</h1>
        <p style="color:rgba(255,255,255,0.85);margin:6px 0 0;font-size:14px;">МедРеабилитация · {datetime.now().strftime("%d.%m.%Y")}</p>
      </div>
      <div style="padding:28px 32px;">
        <p style="font-size:15px;color:#333;">Здравствуйте, <strong>{order["name"]}</strong>!</p>
        <p style="font-size:14px;color:#555;line-height:1.6;">
          Ваш заказ успешно оформлен. Мы свяжемся с вами по номеру <strong>{order["phone"]}</strong> в ближайшее время для подтверждения.
        </p>
        {cert_note}

        <h2 style="font-size:15px;color:#1e2d3d;margin:20px 0 10px;">Ваш заказ (чек)</h2>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#f4f8fb;">
              <th style="padding:8px;text-align:left;color:#555;">Товар</th>
              <th style="padding:8px;text-align:center;color:#555;">Кол-во</th>
              <th style="padding:8px;text-align:right;color:#555;">Сумма</th>
            </tr>
          </thead>
          <tbody>{items_html}</tbody>
        </table>

        <div style="margin-top:16px;padding:14px;background:#f4f8fb;border-radius:8px;">
          <table style="width:100%;font-size:13px;">
            <tr><td style="color:#888;padding:2px 0;">Способ оплаты:</td><td style="text-align:right;font-weight:600;">{pay_label}</td></tr>
            <tr><td style="color:#888;padding:2px 0;">Доставка:</td><td style="text-align:right;font-weight:600;">{"Бесплатно" if delivery==0 else f"{delivery} ₽"}</td></tr>
            <tr><td style="padding:8px 0 2px;font-weight:700;font-size:15px;">Итого к оплате:</td><td style="text-align:right;font-weight:800;font-size:18px;color:#1a7abf;padding-top:8px;">{total:,} ₽</td></tr>
          </table>
        </div>

        <div style="margin-top:24px;padding:16px;background:#f9fafb;border-radius:8px;font-size:13px;color:#555;">
          <strong>Адрес доставки:</strong> {order["address"]}<br><br>
          По всем вопросам: <a href="tel:88005550000" style="color:#1a7abf;font-weight:600;">8-800-555-00-00</a> (бесплатно)
        </div>
      </div>
      <div style="background:#f4f8fb;padding:16px 32px;text-align:center;font-size:12px;color:#aaa;">
        © МедРеабилитация · <a href="#" style="color:#1a7abf;">medrehab.ru</a>
      </div>
    </div>
    """.replace(",", " ")


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    try:
        order = json.loads(event.get("body", "{}"))

        shop_email = os.environ["SHOP_EMAIL"]

        send_email(
            to=shop_email,
            subject=f"🛒 Новый заказ от {order['name']} на {order['totalPrice']:,} ₽".replace(",", " "),
            html_body=manager_email_html(order),
        )

        buyer_email = order.get("email", "").strip()
        if buyer_email:
            send_email(
                to=buyer_email,
                subject="✅ Ваш заказ принят — МедРеабилитация",
                html_body=buyer_email_html(order),
            )

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({"ok": True, "receipt_sent": bool(buyer_email)}),
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "headers": headers,
            "body": json.dumps({"ok": False, "error": str(e)}),
        }
