def message_template(client: str, day: str, time: str) -> str:
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
    return f"""
    <p>Hola {client},</p>
    <p>Gracias por elegir nuestro servicio de podcast para Spotify. Estamos encantados de trabajar con usted y ayudarle a alcanzar sus objetivos de audiencia.</p>
    <p>Le escribimos para confirmar la cita que ha establecido con nosotros. La cita será el día <strong>{day}</strong> a las <strong>{time}</strong>. Por favor, confirme su asistencia respondiendo a este correo electrónico.</p>
    <p>Si tiene alguna pregunta o necesita cambiar la fecha o la hora de la cita, no dude en contactarnos.</p>
    <p>Esperamos hablar con usted pronto.</p>
    <img src="https://img.freepik.com/vector-gratis/plantilla-detallada-logotipo-podcast-auriculares_23-2148778392.jpg?w=200&t=st=1687054571~exp=1687055171~hmac=b45b16ea5586caa05ecd35bdd623566dfce0ab33fc34f2964b20694e834d80e8" />
    <p>Saludos,</p>
    <p>Equipo de <strong>Podcast-T2</strong></p>"""

