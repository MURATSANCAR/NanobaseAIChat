#!/usr/bin/env node
/**
 * Sync NanobaseAI error string keys across client locale files.
 * Run: node scripts/sync-nanobase-error-locales.mjs
 */
import fs from 'fs';
import path from 'path';

const LOCALES_DIR = path.join(process.cwd(), 'client/src/locales');

const KEYS = [
  'com_error_invalid_api_key',
  'com_error_insufficient_quota',
  'com_error_no_user_key',
  'com_error_missing_model',
  'com_error_illegal_model_request',
  'com_agents_missing_provider_model',
];

const BY_LOCALE = {
  en: {
    com_error_invalid_api_key:
      'Invalid API key. Verify your API configuration in account settings or contact your NanobaseAI administrator.',
    com_error_insufficient_quota:
      'The shared API quota has been reached. Add your own API key in account settings or try again later.',
    com_error_no_user_key:
      'No API key configured. Add one in account settings or contact your NanobaseAI administrator.',
    com_error_missing_model:
      'NanobaseAI could not resolve a model for {{0}}. Contact your administrator or check the server configuration.',
    com_error_illegal_model_request:
      'The model "{{0}}" is not available for {{1}}. Contact your NanobaseAI administrator if this continues.',
    com_agents_missing_provider_model:
      'Choose a provider and model for this agent in agent settings before saving.',
  },
  tr: {
    com_error_invalid_api_key:
      'Geçersiz API anahtarı. Hesap ayarlarından API yapılandırmanızı doğrulayın veya NanobaseAI yöneticinizle iletişime geçin.',
    com_error_insufficient_quota:
      'Paylaşılan API kotası doldu. Hesap ayarlarından kendi API anahtarınızı ekleyin veya daha sonra tekrar deneyin.',
    com_error_no_user_key:
      'API anahtarı yapılandırılmamış. Hesap ayarlarından ekleyin veya NanobaseAI yöneticinizle iletişime geçin.',
    com_error_missing_model:
      'NanobaseAI, {{0}} için bir model çözümleyemedi. Yöneticinizle iletişime geçin veya sunucu yapılandırmasını kontrol edin.',
    com_error_illegal_model_request:
      '"{{0}}" modeli {{1}} için kullanılamıyor. Sorun devam ederse NanobaseAI yöneticinizle iletişime geçin.',
    com_agents_missing_provider_model:
      'Kaydetmeden önce bu ajan için ayarlardan bir sağlayıcı ve model seçin.',
  },
  de: {
    com_error_invalid_api_key:
      'Ungültiger API-Schlüssel. Überprüfen Sie die API-Konfiguration in den Kontoeinstellungen oder wenden Sie sich an Ihren NanobaseAI-Administrator.',
    com_error_insufficient_quota:
      'Das gemeinsame API-Kontingent ist ausgeschöpft. Fügen Sie in den Kontoeinstellungen einen eigenen API-Schlüssel hinzu oder versuchen Sie es später erneut.',
    com_error_no_user_key:
      'Kein API-Schlüssel konfiguriert. Fügen Sie einen in den Kontoeinstellungen hinzu oder kontaktieren Sie Ihren NanobaseAI-Administrator.',
    com_error_missing_model:
      'NanobaseAI konnte kein Modell für {{0}} auflösen. Wenden Sie sich an Ihren Administrator oder prüfen Sie die Serverkonfiguration.',
    com_error_illegal_model_request:
      'Das Modell „{{0}}“ ist für {{1}} nicht verfügbar. Wenden Sie sich an Ihren NanobaseAI-Administrator, wenn das Problem bestehen bleibt.',
    com_agents_missing_provider_model:
      'Wählen Sie in den Agenteneinstellungen einen Anbieter und ein Modell, bevor Sie speichern.',
  },
  fr: {
    com_error_invalid_api_key:
      'Clé API invalide. Vérifiez la configuration API dans les paramètres du compte ou contactez votre administrateur NanobaseAI.',
    com_error_insufficient_quota:
      'Le quota API partagé est atteint. Ajoutez votre propre clé API dans les paramètres du compte ou réessayez plus tard.',
    com_error_no_user_key:
      'Aucune clé API configurée. Ajoutez-en une dans les paramètres du compte ou contactez votre administrateur NanobaseAI.',
    com_error_missing_model:
      'NanobaseAI n’a pas pu résoudre de modèle pour {{0}}. Contactez votre administrateur ou vérifiez la configuration du serveur.',
    com_error_illegal_model_request:
      'Le modèle « {{0}} » n’est pas disponible pour {{1}}. Contactez votre administrateur NanobaseAI si le problème persiste.',
    com_agents_missing_provider_model:
      'Choisissez un fournisseur et un modèle pour cet agent dans les paramètres avant d’enregistrer.',
  },
  es: {
    com_error_invalid_api_key:
      'Clave API no válida. Verifique la configuración de API en ajustes de cuenta o contacte a su administrador de NanobaseAI.',
    com_error_insufficient_quota:
      'Se alcanzó la cuota compartida de API. Añada su propia clave API en ajustes de cuenta o inténtelo más tarde.',
    com_error_no_user_key:
      'No hay clave API configurada. Añádala en ajustes de cuenta o contacte a su administrador de NanobaseAI.',
    com_error_missing_model:
      'NanobaseAI no pudo resolver un modelo para {{0}}. Contacte a su administrador o revise la configuración del servidor.',
    com_error_illegal_model_request:
      'El modelo «{{0}}» no está disponible para {{1}}. Contacte a su administrador de NanobaseAI si el problema continúa.',
  },
  it: {
    com_error_invalid_api_key:
      'Chiave API non valida. Verifica la configurazione API nelle impostazioni account o contatta l’amministratore NanobaseAI.',
    com_error_insufficient_quota:
      'La quota API condivisa è esaurita. Aggiungi la tua chiave API nelle impostazioni account o riprova più tardi.',
    com_error_no_user_key:
      'Nessuna chiave API configurata. Aggiungine una nelle impostazioni account o contatta l’amministratore NanobaseAI.',
    com_error_missing_model:
      'NanobaseAI non ha potuto risolvere un modello per {{0}}. Contatta l’amministratore o verifica la configurazione del server.',
    com_error_illegal_model_request:
      'Il modello «{{0}}» non è disponibile per {{1}}. Contatta l’amministratore NanobaseAI se il problema persiste.',
  },
  'pt-BR': {
    com_error_invalid_api_key:
      'Chave de API inválida. Verifique a configuração de API nas configurações da conta ou contate o administrador NanobaseAI.',
    com_error_insufficient_quota:
      'A cota compartilhada de API foi atingida. Adicione sua própria chave de API nas configurações da conta ou tente novamente mais tarde.',
    com_error_no_user_key:
      'Nenhuma chave de API configurada. Adicione uma nas configurações da conta ou contate o administrador NanobaseAI.',
    com_error_missing_model:
      'O NanobaseAI não conseguiu resolver um modelo para {{0}}. Contate o administrador ou verifique a configuração do servidor.',
    com_error_illegal_model_request:
      'O modelo «{{0}}» não está disponível para {{1}}. Contate o administrador NanobaseAI se o problema continuar.',
  },
  'pt-PT': {
    com_error_invalid_api_key:
      'Chave API inválida. Verifique a configuração da API nas definições da conta ou contacte o administrador NanobaseAI.',
    com_error_insufficient_quota:
      'A quota partilhada da API foi atingida. Adicione a sua própria chave API nas definições da conta ou tente novamente mais tarde.',
    com_error_no_user_key:
      'Nenhuma chave API configurada. Adicione uma nas definições da conta ou contacte o administrador NanobaseAI.',
    com_error_missing_model:
      'O NanobaseAI não conseguiu resolver um modelo para {{0}}. Contacte o administrador ou verifique a configuração do servidor.',
    com_error_illegal_model_request:
      'O modelo «{{0}}» não está disponível para {{1}}. Contacte o administrador NanobaseAI se o problema persistir.',
  },
  ru: {
    com_error_invalid_api_key:
      'Недействительный ключ API. Проверьте конфигурацию API в настройках учётной записи или обратитесь к администратору NanobaseAI.',
    com_error_insufficient_quota:
      'Общая квота API исчерпана. Добавьте свой ключ API в настройках учётной записи или повторите попытку позже.',
    com_error_no_user_key:
      'Ключ API не настроен. Добавьте его в настройках учётной записи или обратитесь к администратору NanobaseAI.',
    com_error_missing_model:
      'NanobaseAI не удалось определить модель для {{0}}. Обратитесь к администратору или проверьте конфигурацию сервера.',
    com_error_illegal_model_request:
      'Модель «{{0}}» недоступна для {{1}}. Обратитесь к администратору NanobaseAI, если проблема сохраняется.',
  },
  ja: {
    com_error_invalid_api_key:
      'APIキーが無効です。アカウント設定でAPI構成を確認するか、NanobaseAI管理者にお問い合わせください。',
    com_error_insufficient_quota:
      '共有APIクォータに達しました。アカウント設定で独自のAPIキーを追加するか、後でもう一度お試しください。',
    com_error_no_user_key:
      'APIキーが設定されていません。アカウント設定で追加するか、NanobaseAI管理者にお問い合わせください。',
    com_error_missing_model:
      'NanobaseAIは{{0}}のモデルを解決できませんでした。管理者に連絡するか、サーバー構成を確認してください。',
    com_error_illegal_model_request:
      'モデル「{{0}}」は{{1}}では利用できません。問題が続く場合はNanobaseAI管理者にお問い合わせください。',
  },
  ko: {
    com_error_invalid_api_key:
      '잘못된 API 키입니다. 계정 설정에서 API 구성을 확인하거나 NanobaseAI 관리자에게 문의하세요.',
    com_error_insufficient_quota:
      '공유 API 할당량에 도달했습니다. 계정 설정에서 API 키를 추가하거나 나중에 다시 시도하세요.',
    com_error_no_user_key:
      'API 키가 구성되지 않았습니다. 계정 설정에서 추가하거나 NanobaseAI 관리자에게 문의하세요.',
    com_error_missing_model:
      'NanobaseAI가 {{0}}에 대한 모델을 확인하지 못했습니다. 관리자에게 문의하거나 서버 구성을 확인하세요.',
    com_error_illegal_model_request:
      '모델 "{{0}}"은(는) {{1}}에서 사용할 수 없습니다. 문제가 계속되면 NanobaseAI 관리자에게 문의하세요.',
  },
  'zh-Hans': {
    com_error_invalid_api_key:
      'API 密钥无效。请在账户设置中检查 API 配置，或联系 NanobaseAI 管理员。',
    com_error_insufficient_quota:
      '共享 API 配额已用尽。请在账户设置中添加您自己的 API 密钥，或稍后再试。',
    com_error_no_user_key:
      '未配置 API 密钥。请在账户设置中添加，或联系 NanobaseAI 管理员。',
    com_error_missing_model:
      'NanobaseAI 无法为 {{0}} 解析模型。请联系管理员或检查服务器配置。',
    com_error_illegal_model_request:
      '模型“{{0}}”不适用于 {{1}}。若问题持续，请联系 NanobaseAI 管理员。',
  },
  'zh-Hant': {
    com_error_invalid_api_key:
      'API 金鑰無效。請在帳戶設定中檢查 API 組態，或聯絡 NanobaseAI 管理員。',
    com_error_insufficient_quota:
      '共用 API 配額已用盡。請在帳戶設定中新增您的 API 金鑰，或稍後再試。',
    com_error_no_user_key:
      '尚未設定 API 金鑰。請在帳戶設定中新增，或聯絡 NanobaseAI 管理員。',
    com_error_missing_model:
      'NanobaseAI 無法為 {{0}} 解析模型。請聯絡管理員或檢查伺服器組態。',
    com_error_illegal_model_request:
      '模型「{{0}}」無法用於 {{1}}。若問題持續，請聯絡 NanobaseAI 管理員。',
  },
  ar: {
    com_error_invalid_api_key:
      'مفتاح API غير صالح. تحقق من إعدادات API في إعدادات الحساب أو تواصل مع مسؤول NanobaseAI.',
    com_error_insufficient_quota:
      'تم الوصول إلى حصة API المشتركة. أضف مفتاح API الخاص بك في إعدادات الحساب أو حاول لاحقًا.',
    com_error_no_user_key:
      'لم يتم تكوين مفتاح API. أضف مفتاحًا في إعدادات الحساب أو تواصل مع مسؤول NanobaseAI.',
    com_error_missing_model:
      'تعذر على NanobaseAI تحديد نموذج لـ {{0}}. تواصل مع المسؤول أو تحقق من إعدادات الخادم.',
    com_error_illegal_model_request:
      'النموذج «{{0}}» غير متاح لـ {{1}}. تواصل مع مسؤول NanobaseAI إذا استمرت المشكلة.',
  },
  nl: {
    com_error_invalid_api_key:
      'Ongeldige API-sleutel. Controleer de API-configuratie in accountinstellingen of neem contact op met uw NanobaseAI-beheerder.',
    com_error_insufficient_quota:
      'Het gedeelde API-quotum is bereikt. Voeg uw eigen API-sleutel toe in accountinstellingen of probeer het later opnieuw.',
    com_error_no_user_key:
      'Geen API-sleutel geconfigureerd. Voeg er een toe in accountinstellingen of neem contact op met uw NanobaseAI-beheerder.',
    com_error_missing_model:
      'NanobaseAI kon geen model vinden voor {{0}}. Neem contact op met uw beheerder of controleer de serverconfiguratie.',
    com_error_illegal_model_request:
      'Het model «{{0}}» is niet beschikbaar voor {{1}}. Neem contact op met uw NanobaseAI-beheerder als dit aanhoudt.',
  },
  pl: {
    com_error_invalid_api_key:
      'Nieprawidłowy klucz API. Sprawdź konfigurację API w ustawieniach konta lub skontaktuj się z administratorem NanobaseAI.',
    com_error_insufficient_quota:
      'Wspólny limit API został wyczerpany. Dodaj własny klucz API w ustawieniach konta lub spróbuj ponownie później.',
    com_error_no_user_key:
      'Brak skonfigurowanego klucza API. Dodaj go w ustawieniach konta lub skontaktuj się z administratorem NanobaseAI.',
    com_error_missing_model:
      'NanobaseAI nie mogło ustalić modelu dla {{0}}. Skontaktuj się z administratorem lub sprawdź konfigurację serwera.',
    com_error_illegal_model_request:
      'Model «{{0}}» nie jest dostępny dla {{1}}. Skontaktuj się z administratorem NanobaseAI, jeśli problem się utrzymuje.',
  },
};

const fallback = BY_LOCALE.en;

const dirs = fs.readdirSync(LOCALES_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let updated = 0;

for (const locale of dirs) {
  const filePath = path.join(LOCALES_DIR, locale, 'translation.json');
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const strings = { ...fallback, ...(BY_LOCALE[locale] ?? {}) };
  let changed = false;

  for (const key of KEYS) {
    if (data[key] !== strings[key]) {
      data[key] = strings[key];
      changed = true;
    }
  }

  if (changed) {
    const sorted = Object.fromEntries(
      Object.keys(data)
        .sort()
        .map((k) => [k, data[k]]),
    );
    fs.writeFileSync(filePath, `${JSON.stringify(sorted, null, 2)}\n`);
    updated += 1;
  }
}

console.log(`Updated ${updated} locale files.`);
