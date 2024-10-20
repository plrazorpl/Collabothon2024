import json

from django.http import HttpResponse
from django.shortcuts import render
from rest_framework import status

# Create your views here.

from rest_framework.decorators import api_view
from rest_framework.response import Response

from cockpit.commerzapi import create_synthetic_card_data, get_email_info
from cockpit.models import Email

emails = []


@api_view(['GET'])
def index(request):
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def financial_overwiew(request):
    return Response(status=status.HTTP_200_OK, data={'Username': 'praskouya'})


@api_view(['GET'])
def get_task_list(request):
    return Response(status=status.HTTP_200_OK,
                    data={'tasks': ["Eat the rich", "Eat the poor", "Eat oil", "Dunno what else google does"]})


@api_view(['GET'])
def get_emails(request):
    email_list = get_email_info()
    return Response(status=status.HTTP_200_OK, data=email_list)


@api_view(['POST'])
def add_email(request):
    data = json.loads(request.body)
    emails.append(data)
    return Response(status=status.HTTP_200_OK)


transactions = [{"description": "Hackathon", "account": "account: **** 1111",
                 "amount": "-7590.0", "currency": "eur", "positive": False, "details": "Collabothon"},
                {"description": "Sponsors", "account": "account: **** 1111",
                 "amount": "+3000.0", "currency": "eur", "positive": True, "details": "For Hackathon"},
                {"description": "Frankfurt Komputersystem GmbH", "account": "account: **** 1337",
                 "amount": "+100000.0", "currency": "eur", "positive": True, "details": "Das Hinterlegung"}
                ]


@api_view(['GET'])
def get_transactions(request):
    return Response(status=status.HTTP_200_OK, data=transactions)

@api_view(['POST'])
def add_transaction(request):
    data = json.loads(request.body)
    if (len(transactions) < 5):
        transactions.append(data)
    return Response(status=status.HTTP_200_OK)

import random as r
currencies = ['EUR', 'USD', 'UAH', 'PLN']
data = [
            {
                "account": "account: **** 1111",
                "balance": [{"currency": i, "amount": r.randint(0, 1000000)} for i in currencies]
            },
            {
                "account": "account: **** 2222",
                "balance": [{"currency": i, "amount": r.randint(0, 1000000)} for i in currencies]
            },
            {
                "account": "account: **** 1337",
                "balance": [{"currency": i, "amount": r.randint(0, 1000000)} for i in currencies]
            },
            {
                "account": "account: **** 1234",
                "balance": [{"currency": i, "amount": r.randint(0, 1000000)} for i in currencies]
            },
{
                "account": "Savings",
                "balance": [{"currency": i, "amount": r.randint(0, 1000000)} for i in currencies]
            },
        ]
@api_view(['GET'])
def get_account_balance(request):
    import random as r
    r.seed(2137)
    currency = request.query_params.get('currency')

    balance = []
    for account in data:
        item = {"name": account["account"], "value": ""}
        for c in account["balance"]:
            if c["currency"] == currency:
                item["value"] = c["amount"]
        balance.append(item)
    return Response(status=status.HTTP_200_OK, data=balance)
