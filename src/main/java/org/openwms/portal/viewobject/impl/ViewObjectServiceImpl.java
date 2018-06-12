/*
 * openwms.org, the Open Warehouse Management System.
 * Copyright (C) 2014 Heiko Scherrer
 *
 * This file is part of openwms.org.
 *
 * openwms.org is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation; either version 2 of the
 * License, or (at your option) any later version.
 *
 * openwms.org is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this software. If not, write to the Free Software
 * Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA
 * 02110-1301 USA, or see the FSF site: http://www.fsf.org.
 */
package org.openwms.portal.viewobject.impl;

import io.interface21.cloud.ui.ViewObjectVO;
import org.ameba.annotation.TxService;
import org.ameba.mapping.BeanMapper;
import org.openwms.portal.viewobject.ViewObjectService;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * A ViewObjectServiceImpl.
 *
 * @author <a href="mailto:hscherrer@interface21.io">Heiko Scherrer</a>
 */
@TxService
class ViewObjectServiceImpl implements ViewObjectService {

    private final BeanMapper mapper;
    private final ViewObjectRepository repository;

    ViewObjectServiceImpl(BeanMapper mapper, ViewObjectRepository repository) {
        this.mapper = mapper;
        this.repository = repository;
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void update(List<ViewObjectVO> vos) {
        vos.forEach(vo -> {
            Optional<ViewObjectEO> opt = repository.findByName(vo.getName());
            ViewObjectEO eo;
            if (opt.isPresent()) {
                eo = mapper.mapFromTo(vo, opt.get());
                repository.save(eo);
            } else {
                eo = mapper.map(vo, ViewObjectEO.class);
                repository.save(eo);
            }
        });
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Set<ViewObjectVO> findAll() {
        List<ViewObjectEO> all = repository.findAll();
        return new HashSet<>(mapper.map(all, ViewObjectVO.class));
    }
}
