from django.shortcuts import render,  redirect
from .models import Services, Advertising, Work, Setting
from .forms import ClientsForm
import requests
import time
from django.shortcuts import render
from django.http import HttpResponse

def index(request):
    setting = Setting.objects.get(id=1)
    services=Services.objects.all()
    advertising=Advertising.objects.all()
    work=Work.objects.all()
    return render(request, 'main/index.html', {'title': 'Sio2 - Кварц', 'services': services, 'advertising': advertising, 'work': work, 'setting': setting})


def application(request):
    id = request.GET.get('id')
    setting = Setting.objects.get(id=1)
    services = Services.objects.all()

    if id:
        services = services.filter(id=id)
        


    if request.method == 'POST':
        form = ClientsForm(request.POST)
        if form.is_valid():
            form.save()    
            # script_url = 'url'  
            # данные = {
            #     'first_name': form.cleaned_data['first_name'],
            #     'last_name': form.cleaned_data['last_name'],
            #     'patronymic': form.cleaned_data['patronymic'],
            #     'tel': form.cleaned_data['tel'],
            #     'connection': form.cleaned_data['connection'],
            #     'services': form.cleaned_data['services'],
            #     'services_name': form.cleaned_data['services_name'],
            # }
            # ответ = requests.post(script_url, json=данные)
            data = request.POST.copy()
            if 'csrfmiddlewaretoken' in data:
                del data['csrfmiddlewaretoken']
            send_to_telegram(data)
            time.sleep(10)
            return redirect('index')
        else:
            error = 'Некорректные данные'
    else:
        form = ClientsForm(initial_id=id)
    context = {
        'form': form,
        'title': 'Sio2 - Заявка',
        'services': services,
        'setting': setting
    }
    return render(request, 'main/application.html', context)




def send_to_telegram(data):
    try:
        TELEGRAM_API_KEY = '6895663437:AAG0R0TyjUp3e7hrfUml2_7gKIWXKP-ZQJs'
        CHAT_ID = '-4103390932'
        # TELEGRAM_API_KEY = os.getenv('TELEGRAM_API_KEY')
        # CHAT_ID = os.getenv('CHAT_ID')
        if not TELEGRAM_API_KEY or not CHAT_ID:
            raise ValueError("API key и/или chat ID не заданы")
        field_names = {
            'first_name': 'Имя',
            'last_name': 'Фамилия',
            'patronymic': 'Отчество',
            'tel': 'Телефон',
            'connection': 'Гос. номер',
            'services': '№ услуги',
            'services_name': 'Услуга'
        }

        message = "Новая заявка!\n\n"
        for key, value in data.items():
            field_name = field_names.get(key, key)
            message += f"{field_name}: {value}\n"

        url = f"https://api.telegram.org/bot{TELEGRAM_API_KEY}/sendMessage"

        payload = {
            'chat_id': CHAT_ID,
            'text': message
        }

        response = requests.post(url, json=payload)

        if response.status_code == 200:
            print("")
        else:
            print(f"Ошибка при отправке сообщения в Telegram: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"Ошибка при отправке сообщения в Telegram: {e}")


def dynamic_css(request):
    setting = Setting.objects.get(id=1)  
    css_content = f"""
    :root {{
        --color-pink: {setting.color};
        --bloc: {setting.bloc};
        --color-gray: #6e6e73;
        --color-background: {setting.background};
        --border: 10px;
    }}
    """
    return HttpResponse(css_content, content_type='text/css')