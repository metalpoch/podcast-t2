def message_template(client: str, lang: str, day: str) -> str:
    """
    Returns an HTML message template for confirming a podcast appointment.

    Parameters
    ----------
    client : str
        The name of the client.
    day : str
        The day of the appointment.
    time : str
        The time of the appointment.

    Returns
    -------
    str
        An HTML message template for confirming a podcast appointment.
    """
    if lang == "en":
        return f"""
    <p>Hello {client},</p>
     <p>Thank you for choosing our podcast service for Spotify. We are happy to work with you and help you achieve your audience goals.</p>
     <p>We are writing to confirm the appointment you have made with us. The appointment will be on <strong>{day}</strong>. Please RSVP by replying to this email.</p>
     <p>If you have any questions or need to change the date or time of your appointment, please feel free to contact us.</p>
     <p>We look forward to speaking with you soon.</p>
     <img src="https://img.freepik.com/free-vector/podcast-headphone-logo-detailed-template_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566d fce0ab33fc34f2964b20694e834d80e8" / >
     <p>Greetings,</p>
     <p>Team <strong>Podcast-T2</strong></p>
    """
    elif lang == "de":
        return f"""
        <p>Hallo {client},</p>
        <p>Vielen Dank, dass Sie sich für unseren Podcast-Service für Spotify entschieden haben. Wir arbeiten gerne mit Ihnen zusammen und helfen Ihnen, Ihre Zielgruppenziele zu erreichen.</p>
        <p>Wir schreiben Ihnen, um den von Ihnen vereinbarten Termin zu bestätigen. Der Termin findet am <strong>{day}</strong>. Bitte melden Sie sich an, indem Sie auf diese E-Mail antworten.</p>
     <p>Wenn Sie Fragen haben oder das Datum oder die Uhrzeit Ihres Termins ändern müssen, können Sie sich gerne an uns wenden.</p>
     <p>Wir freuen uns darauf, bald mit Ihnen zu sprechen.</p>
     <img src="https://img.freepik.com/free-vector/podcast-headphone-logo-detailed-template_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566d fce 0ab33fc34f2964b20694e834d80e8" / >
     <p>Grüße,</p>
     <p>Team <strong>Podcast-T2</strong></p>
    """
    elif lang == "fr":
        return f"""
    <p>Bonjour {client},</p>
     <p>Merci d'avoir choisi notre service de podcast pour Spotify. Nous sommes heureux de travailler avec vous et de vous aider à atteindre vos objectifs d'audience.</p>
     <p>Nous vous écrivons pour confirmer le rendez-vous que vous avez pris avec nous. Le rendez-vous aura lieu le <strong>{day}</strong>. Veuillez confirmer votre présence en répondant à cet e-mail.</p>
     <p>Si vous avez des questions ou avez besoin de changer la date ou l'heure de votre rendez-vous, n'hésitez pas à nous contacter.</p>
     <p>Nous sommes impatients de vous parler bientôt.</p>
     <img src="https://img.freepik.com/vecteur-libre/podcast-casque-logo-detailed-template_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566d fce0ab3 3fc34f2964b20694e834d80e8" / >
     <p>Salutations,</p>
     <p>Équipe <strong>Podcast-T2</strong></p>
    """
    elif lang == "it":
        return f"""
        <p>Ciao {client},</p>
     <p>Grazie per aver scelto il nostro servizio di podcast per Spotify. Siamo felici di lavorare con te e aiutarti a raggiungere i tuoi obiettivi di pubblico.</p>
     <p>Ti scriviamo per confermare l'appuntamento che hai preso con noi. L'appuntamento sarà il <strong>{day}</strong>. Si prega di rispondere rispondendo a questa email.</p>
     <p>Se hai domande o devi modificare la data o l'ora dell'appuntamento, non esitare a contattarci.</p>
     <p>Non vediamo l'ora di parlare presto con te.</p>
     <img src="https://img.freepik.com/free-vector/podcast-headphone-logo-detailed-template_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566d fce0 ab33fc34f2964b20694e834d80e8" / >
     <p>Saluti,</p>
     <p>Team <strong>Podcast-T2</strong></p>
    """
    elif lang == "pt":
        return f"""
    <p>Olá {client},</p>
     <p>Obrigado por escolher nosso serviço de podcast para o Spotify. Estamos felizes em trabalhar com você e ajudá-lo a atingir suas metas de público.</p>
     <p>Estamos escrevendo para confirmar o agendamento que você fez conosco. O compromisso será em <strong>{day}</strong>. Confirme presença respondendo a este e-mail.</p>
     <p>Se você tiver alguma dúvida ou precisar alterar a data ou horário do seu compromisso, entre em contato conosco.</p>
     <p>Esperamos falar com você em breve.</p>
     <img src="https://img.freepik.com/free-vector/podcast-headphone-logo-detailed-template_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566d f ce0ab33fc34f2964b20694e834d80e8" / >
     <p>Saudações,</p>
     <p>Equipe <strong>Podcast-T2</strong></p>
    """
    elif lang == "ja":
        return f"""
        <p>こんにちは、{client} さん</p>
     <p>Spotify 向けポッドキャスト サービスをお選びいただきありがとうございます。 私たちは喜んで協力し、視聴者目標の達成をお手伝いいたします。</p>
     <p>私たちは、あなたとの約束を確認するために手紙を書いています。 予約は <strong>{day}</strong>。 このメールに返信して出欠の旨をご連絡ください。</p>
     <p>ご質問がある場合、または予約の日付や時間を変更する必要がある場合は、お気軽にお問い合わせください。</p>
     <p>お会いできることを楽しみにしています。</p>
     <img src="https://img.freepik.com/free-vector/podcast-headphone-logo-detailed-template_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566d fce0 ab33fc34f2964b20694e834d80e8" / >
     <p>こんにちは。</p>
     <p>チーム<strong>ポッドキャスト T2</strong></p>
        """

    else:
        return f"""
    <p>Hola {client},</p>
    <p>Gracias por elegir nuestro servicio de podcast para Spotify. Estamos encantados de trabajar con usted y ayudarle a alcanzar sus objetivos de audiencia.</p>
    <p>Le escribimos para confirmar la cita que ha establecido con nosotros. La cita será el día <strong>{day}</strong>. Por favor, confirme su asistencia respondiendo a este correo electrónico.</p>
    <p>Si tiene alguna pregunta o necesita cambiar la fecha o la hora de la cita, no dude en contactarnos.</p>
    <p>Esperamos hablar con usted pronto.</p>
    <img src="https://img.freepik.com/vector-gratis/plantilla-detallada-logotipo-podcast-auriculares_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566dfce0ab33fc34f2964b20694e834d80e8" />
    <p>Saludos,</p>
    <p>Equipo de <strong>Podcast-T2</strong></p>"""
