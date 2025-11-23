/**
 * SMS 템플릿 관리 페이지
 */

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MessageSquare,
  Plus,
  Edit,
  Trash2,
  Send,
  Eye,
  Copy,
  Check
} from 'lucide-react';

interface SMSTemplate {
  id: string;
  name: string;
  office: '천안' | '평택' | '공통';
  type: string;
  subject: string;
  content: string;
  variables: string[];
  message_type: 'SMS' | 'LMS';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function SMSTemplatesPage() {
  const [templates, setTemplates] = useState<SMSTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<SMSTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [filter, setFilter] = useState({ office: 'all', type: 'all' });
  const [preview, setPreview] = useState('');
  const [testPhone, setTestPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // 템플릿 목록 로드
  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const res = await fetch('/api/admin/sms-templates');
      const data = await res.json();
      setTemplates(data);
    } catch (error) {
      console.error('Failed to load templates:', error);
    }
  };

  // 템플릿 저장
  const handleSave = async () => {
    if (!selectedTemplate) return;

    setLoading(true);
    try {
      const url = isCreating
        ? '/api/admin/sms-templates'
        : `/api/admin/sms-templates/${selectedTemplate.id}`;

      const res = await fetch(url, {
        method: isCreating ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedTemplate)
      });

      if (res.ok) {
        await loadTemplates();
        setIsEditing(false);
        setIsCreating(false);
        setSelectedTemplate(null);
        alert('템플릿이 저장되었습니다.');
      }
    } catch (error) {
      console.error('Failed to save template:', error);
      alert('저장에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 템플릿 삭제
  const handleDelete = async (id: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      const res = await fetch(`/api/admin/sms-templates/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        await loadTemplates();
        setSelectedTemplate(null);
      }
    } catch (error) {
      console.error('Failed to delete template:', error);
    }
  };

  // 미리보기 생성
  const generatePreview = () => {
    if (!selectedTemplate) return;

    let content = selectedTemplate.content;
    const sampleVariables: Record<string, string> = {
      customerName: '홍길동',
      bookingDate: '12월 15일',
      bookingTime: '오후 2시',
      lawyerName: '김변호사',
      office: selectedTemplate.office === '공통' ? '천안' : selectedTemplate.office,
      paymentAmount: '100,000',
      paymentDueDate: '12월 13일',
      accountBank: selectedTemplate.office === '천안' ? '농협' : '국민',
      accountNumber: selectedTemplate.office === '천안'
        ? '123-456-789012'
        : '987-654-321098'
    };

    // 변수 치환
    Object.entries(sampleVariables).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    setPreview(content);
  };

  // 테스트 발송
  const handleTestSend = async () => {
    if (!testPhone || !selectedTemplate) {
      alert('전화번호를 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/admin/sms-templates/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateId: selectedTemplate.id,
          phone: testPhone
        })
      });

      if (res.ok) {
        alert('테스트 메시지가 발송되었습니다.');
      } else {
        alert('발송에 실패했습니다.');
      }
    } catch (error) {
      console.error('Test send failed:', error);
      alert('발송에 실패했습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 필터링된 템플릿
  const filteredTemplates = templates.filter(template => {
    if (filter.office !== 'all' && template.office !== filter.office) return false;
    if (filter.type !== 'all' && template.type !== filter.type) return false;
    return true;
  });

  // 템플릿 타입 목록
  const templateTypes = [
    { value: 'payment_pending', label: '입금 안내' },
    { value: 'confirmed', label: '예약 확정' },
    { value: 'reminder', label: '리마인더' },
    { value: 'cancelled', label: '취소 안내' },
    { value: 'thank_you', label: '상담 후 감사' }
  ];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">SMS 템플릿 관리</h1>
        <p className="text-gray-600">
          고객에게 발송할 SMS 템플릿을 관리합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 템플릿 목록 */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>템플릿 목록</CardTitle>
                <Button
                  size="sm"
                  onClick={() => {
                    setIsCreating(true);
                    setIsEditing(true);
                    setSelectedTemplate({
                      id: '',
                      name: '',
                      office: '천안',
                      type: 'payment_pending',
                      subject: '',
                      content: '[법무법인 더율]\n',
                      variables: [],
                      message_type: 'SMS',
                      is_active: true,
                      created_at: '',
                      updated_at: ''
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-1" />
                  새 템플릿
                </Button>
              </div>

              {/* 필터 */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Select
                  value={filter.office}
                  onValueChange={(value) => setFilter({ ...filter, office: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 사무소</SelectItem>
                    <SelectItem value="천안">천안</SelectItem>
                    <SelectItem value="평택">평택</SelectItem>
                    <SelectItem value="공통">공통</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={filter.type}
                  onValueChange={(value) => setFilter({ ...filter, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 타입</SelectItem>
                    {templateTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              {filteredTemplates.map((template) => (
                <div
                  key={template.id}
                  className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedTemplate?.id === template.id ? 'border-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => {
                    setSelectedTemplate(template);
                    setIsEditing(false);
                    setIsCreating(false);
                    generatePreview();
                  }}
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-medium">{template.name}</h4>
                    <Badge variant={template.is_active ? 'default' : 'secondary'}>
                      {template.is_active ? '활성' : '비활성'}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="outline">{template.office}</Badge>
                    <Badge variant="outline">{template.message_type}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* 템플릿 상세/편집 */}
        <div className="lg:col-span-2">
          {selectedTemplate ? (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>
                    {isCreating ? '새 템플릿 만들기' : isEditing ? '템플릿 수정' : '템플릿 상세'}
                  </CardTitle>
                  <div className="flex gap-2">
                    {!isEditing && !isCreating && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          수정
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(selectedTemplate.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          삭제
                        </Button>
                      </>
                    )}
                    {(isEditing || isCreating) && (
                      <>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false);
                            setIsCreating(false);
                            setSelectedTemplate(null);
                          }}
                        >
                          취소
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={loading}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          저장
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>템플릿 이름</Label>
                    <Input
                      value={selectedTemplate.name}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        name: e.target.value
                      })}
                      disabled={!isEditing && !isCreating}
                      placeholder="예: 입금안내_천안"
                    />
                  </div>

                  <div>
                    <Label>제목 (관리용)</Label>
                    <Input
                      value={selectedTemplate.subject}
                      onChange={(e) => setSelectedTemplate({
                        ...selectedTemplate,
                        subject: e.target.value
                      })}
                      disabled={!isEditing && !isCreating}
                      placeholder="예: 상담료 입금 안내"
                    />
                  </div>

                  <div>
                    <Label>사무소</Label>
                    <Select
                      value={selectedTemplate.office}
                      onValueChange={(value: '천안' | '평택' | '공통') =>
                        setSelectedTemplate({
                          ...selectedTemplate,
                          office: value
                        })
                      }
                      disabled={!isEditing && !isCreating}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="천안">천안</SelectItem>
                        <SelectItem value="평택">평택</SelectItem>
                        <SelectItem value="공통">공통</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>템플릿 타입</Label>
                    <Select
                      value={selectedTemplate.type}
                      onValueChange={(value) =>
                        setSelectedTemplate({
                          ...selectedTemplate,
                          type: value
                        })
                      }
                      disabled={!isEditing && !isCreating}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {templateTypes.map(type => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>템플릿 내용</Label>
                  <Textarea
                    value={selectedTemplate.content}
                    onChange={(e) => setSelectedTemplate({
                      ...selectedTemplate,
                      content: e.target.value
                    })}
                    disabled={!isEditing && !isCreating}
                    rows={10}
                    className="font-mono text-sm"
                    placeholder="변수는 {{변수명}} 형식으로 입력하세요."
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    사용 가능한 변수: customerName, bookingDate, bookingTime, lawyerName, office, paymentAmount, paymentDueDate, accountBank, accountNumber
                  </p>
                </div>

                {/* 미리보기 */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label>미리보기</Label>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={generatePreview}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      미리보기 생성
                    </Button>
                  </div>
                  <div className="p-4 bg-gray-100 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm">
                      {preview || '미리보기 생성 버튼을 클릭하세요.'}
                    </pre>
                    {preview && (
                      <div className="mt-2 text-xs text-gray-500">
                        {Buffer.byteLength(preview, 'utf-8')}바이트 /
                        {Buffer.byteLength(preview, 'utf-8') <= 90 ? ' SMS' : ' LMS'}
                      </div>
                    )}
                  </div>
                </div>

                {/* 테스트 발송 */}
                <div>
                  <Label>테스트 발송</Label>
                  <div className="flex gap-2">
                    <Input
                      type="tel"
                      value={testPhone}
                      onChange={(e) => setTestPhone(e.target.value)}
                      placeholder="010-1234-5678"
                      className="flex-1"
                    />
                    <Button
                      onClick={handleTestSend}
                      disabled={loading || !preview}
                    >
                      <Send className="w-4 h-4 mr-1" />
                      테스트 발송
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-96 text-gray-500">
                <div className="text-center">
                  <MessageSquare className="w-12 h-12 mx-auto mb-4" />
                  <p>템플릿을 선택하거나 새로 만들어주세요.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}